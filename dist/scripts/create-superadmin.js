"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a superadmin Firebase account + MongoDB user in one step.
 * Usage: npx ts-node -r tsconfig-paths/register src/scripts/create-superadmin.ts
 */
const config_1 = require("../config");
const database_1 = require("../config/database");
const firebase_1 = require("../config/firebase");
const user_model_1 = require("../models/user.model");
const logger_1 = require("../shared/utils/logger");
const EMAIL = 'superadmin@speffo.in';
const PASSWORD = 'Amrit2vicky@';
const FIRST_NAME = 'Super';
const LAST_NAME = 'Admin';
async function run() {
    (0, config_1.loadConfig)();
    const app = (0, firebase_1.initializeFirebase)();
    if (!app) {
        throw new Error('Firebase failed to initialize — check FIREBASE_PRIVATE_KEY in .env');
    }
    await (0, database_1.connectDatabase)();
    try {
        const firebaseAuth = (0, firebase_1.getFirebaseAuth)();
        // Create or fetch the Firebase user
        let firebaseUser;
        try {
            firebaseUser = await firebaseAuth.getUserByEmail(EMAIL);
            logger_1.logger.info(`Firebase user already exists: ${firebaseUser.uid}`);
            // Ensure password is set correctly
            await firebaseAuth.updateUser(firebaseUser.uid, { password: PASSWORD, emailVerified: true });
            logger_1.logger.info('Firebase password updated');
        }
        catch (err) {
            if (err.code === 'auth/user-not-found') {
                firebaseUser = await firebaseAuth.createUser({
                    email: EMAIL,
                    password: PASSWORD,
                    displayName: `${FIRST_NAME} ${LAST_NAME}`,
                    emailVerified: true,
                });
                logger_1.logger.info(`Firebase user created: ${firebaseUser.uid}`);
            }
            else {
                throw err;
            }
        }
        // Upsert the MongoDB user
        const existing = await user_model_1.User.findOne({ email: EMAIL });
        if (existing) {
            existing.firebaseUid = firebaseUser.uid;
            existing.role = 'super_admin';
            existing.status = 'active';
            existing.firstName = FIRST_NAME;
            existing.lastName = LAST_NAME;
            existing.emailVerified = true;
            await existing.save();
            logger_1.logger.info(`MongoDB user updated → role=super_admin, firebaseUid=${firebaseUser.uid}`);
        }
        else {
            await user_model_1.User.create({
                firebaseUid: firebaseUser.uid,
                email: EMAIL,
                firstName: FIRST_NAME,
                lastName: LAST_NAME,
                role: 'super_admin',
                status: 'active',
                emailVerified: true,
                phoneVerified: false,
                tokenVersion: 0,
                metadata: { loginCount: 0, totalOrders: 0, totalSpent: 0 },
            });
            logger_1.logger.info(`MongoDB user created → role=super_admin`);
        }
        logger_1.logger.info('Done. Superadmin is ready.');
        logger_1.logger.info(`  Email:    ${EMAIL}`);
        logger_1.logger.info(`  Password: ${PASSWORD}`);
        logger_1.logger.info(`  Firebase UID: ${firebaseUser.uid}`);
    }
    finally {
        await (0, database_1.disconnectDatabase)();
    }
}
run().catch((err) => {
    logger_1.logger.error({ err }, 'create-superadmin failed');
    process.exit(1);
});
//# sourceMappingURL=create-superadmin.js.map