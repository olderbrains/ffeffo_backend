"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirebase = initializeFirebase;
exports.getFirebaseAuth = getFirebaseAuth;
const admin = __importStar(require("firebase-admin"));
const auth_1 = require("firebase-admin/auth");
const index_1 = require("./index");
const logger_1 = require("../shared/utils/logger");
let firebaseApp = null;
function initializeFirebase() {
    if (firebaseApp) {
        return firebaseApp;
    }
    const config = (0, index_1.getConfig)();
    if (config.FIREBASE_PRIVATE_KEY === 'dev-key' || config.NODE_ENV === 'development') {
        try {
            firebaseApp = admin.initializeApp({
                credential: admin.cert({
                    projectId: config.FIREBASE_PROJECT_ID,
                    privateKey: config.FIREBASE_PRIVATE_KEY,
                    clientEmail: config.FIREBASE_CLIENT_EMAIL,
                }),
            });
        }
        catch {
            logger_1.logger.warn('Firebase initialization skipped — using placeholder credentials');
            return null;
        }
    }
    else {
        firebaseApp = admin.initializeApp({
            credential: admin.cert({
                projectId: config.FIREBASE_PROJECT_ID,
                privateKey: config.FIREBASE_PRIVATE_KEY,
                clientEmail: config.FIREBASE_CLIENT_EMAIL,
            }),
        });
    }
    return firebaseApp;
}
function getFirebaseAuth() {
    if (!firebaseApp) {
        throw new Error('Firebase not initialized. Provide valid Firebase credentials.');
    }
    return (0, auth_1.getAuth)(firebaseApp);
}
//# sourceMappingURL=firebase.js.map