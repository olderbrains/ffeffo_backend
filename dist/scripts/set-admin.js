"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Maps a real Firebase account to a platform user and/or assigns a role.
 *
 * The Firebase → JWT exchange in auth.service looks the user up by
 * `firebaseUid`. Seeded users carry placeholder UIDs, so before a real
 * Firebase sign-in can succeed you must point an existing user (or create one)
 * at the real Firebase UID.
 *
 * Usage:
 *   npm run set-admin -- --email admin@speffo.com --uid <firebaseUid> [--role admin] [--create]
 *
 * Find the UID in Firebase Console → Authentication → Users, or from the
 * client after sign-in via `auth.currentUser.uid`.
 */
const config_1 = require("../config");
const database_1 = require("../config/database");
const user_model_1 = require("../models/user.model");
const logger_1 = require("../shared/utils/logger");
const VALID_ROLES = ['super_admin', 'admin', 'manager', 'support_agent', 'customer'];
function parseArgs(argv) {
    const args = {};
    for (let i = 0; i < argv.length; i++) {
        const token = argv[i];
        if (!token?.startsWith('--'))
            continue;
        const key = token.slice(2);
        const next = argv[i + 1];
        if (next && !next.startsWith('--')) {
            args[key] = next;
            i++;
        }
        else {
            args[key] = true;
        }
    }
    return args;
}
async function run() {
    const args = parseArgs(process.argv.slice(2));
    const email = typeof args.email === 'string' ? args.email.toLowerCase() : undefined;
    const uid = typeof args.uid === 'string' ? args.uid : undefined;
    const role = typeof args.role === 'string' ? args.role : undefined;
    const create = args.create === true;
    if (!email || !uid) {
        logger_1.logger.error('Usage: npm run set-admin -- --email <email> --uid <firebaseUid> [--role <role>] [--create]');
        process.exit(1);
    }
    if (role && !VALID_ROLES.includes(role)) {
        logger_1.logger.error(`Invalid role '${role}'. Valid roles: ${VALID_ROLES.join(', ')}`);
        process.exit(1);
    }
    (0, config_1.loadConfig)();
    await (0, database_1.connectDatabase)();
    try {
        let user = await user_model_1.User.findOne({ email });
        if (!user) {
            if (!create) {
                logger_1.logger.error(`No user found with email '${email}'. Pass --create to create one, and --role to set the role.`);
                process.exit(1);
            }
            user = await user_model_1.User.create({
                firebaseUid: uid,
                email,
                firstName: 'Admin',
                lastName: 'User',
                role: role ?? 'admin',
                status: 'active',
                emailVerified: true,
                phoneVerified: false,
                tokenVersion: 0,
                metadata: { loginCount: 0, totalOrders: 0, totalSpent: 0 },
            });
            logger_1.logger.info(`Created user '${email}' with role '${user.role}' and firebaseUid '${uid}'.`);
        }
        else {
            user.firebaseUid = uid;
            if (role) {
                user.role = role;
            }
            user.status = 'active';
            await user.save();
            logger_1.logger.info(`Updated user '${email}': firebaseUid set, role='${user.role}', status='active'.`);
        }
    }
    finally {
        await (0, database_1.disconnectDatabase)();
    }
}
run().catch((err) => {
    logger_1.logger.error({ err }, 'set-admin failed');
    process.exit(1);
});
//# sourceMappingURL=set-admin.js.map