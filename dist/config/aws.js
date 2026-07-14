"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3Client = getS3Client;
exports.getSQSClient = getSQSClient;
exports.getSESClient = getSESClient;
exports.getSNSClient = getSNSClient;
const client_s3_1 = require("@aws-sdk/client-s3");
const client_ses_1 = require("@aws-sdk/client-ses");
const client_sns_1 = require("@aws-sdk/client-sns");
const client_sqs_1 = require("@aws-sdk/client-sqs");
const credential_provider_imds_1 = require("@aws-sdk/credential-provider-imds");
const index_1 = require("./index");
let s3Client = null;
let sqsClient = null;
let sesClient = null;
let snsClient = null;
function getCredentials() {
    const config = (0, index_1.getConfig)();
    return {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    };
}
function getS3Client() {
    if (!s3Client) {
        const config = (0, index_1.getConfig)();
        // Use the EC2 instance role for S3 (scoped assets-bucket write policy).
        // fromInstanceMetadata() bypasses the static AWS_* env keys (which lack
        // S3 access) that the default provider chain would otherwise pick up.
        s3Client = new client_s3_1.S3Client({
            region: config.AWS_REGION,
            credentials: (0, credential_provider_imds_1.fromInstanceMetadata)(),
        });
    }
    return s3Client;
}
function getSQSClient() {
    if (!sqsClient) {
        const config = (0, index_1.getConfig)();
        sqsClient = new client_sqs_1.SQSClient({
            region: config.AWS_REGION,
            credentials: getCredentials(),
        });
    }
    return sqsClient;
}
function getSESClient() {
    if (!sesClient) {
        const config = (0, index_1.getConfig)();
        sesClient = new client_ses_1.SESClient({
            region: config.SES_REGION,
            credentials: getCredentials(),
        });
    }
    return sesClient;
}
function getSNSClient() {
    if (!snsClient) {
        const config = (0, index_1.getConfig)();
        snsClient = new client_sns_1.SNSClient({
            region: config.AWS_REGION,
            credentials: getCredentials(),
        });
    }
    return snsClient;
}
//# sourceMappingURL=aws.js.map