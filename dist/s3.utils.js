"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createS3Connection = exports.getS3ConnectionToken = exports.getS3OptionsToken = void 0;
const S3 = require("aws-sdk/clients/s3");
const s3_constants_1 = require("./s3.constants");
function getS3OptionsToken(connection) {
    return `${connection || s3_constants_1.S3_MODULE_CONNECTION}_${s3_constants_1.S3_MODULE_OPTIONS_TOKEN}`;
}
exports.getS3OptionsToken = getS3OptionsToken;
function getS3ConnectionToken(connection) {
    return `${connection || s3_constants_1.S3_MODULE_CONNECTION}_${s3_constants_1.S3_MODULE_CONNECTION_TOKEN}`;
}
exports.getS3ConnectionToken = getS3ConnectionToken;
function createS3Connection(options) {
    const { config } = options;
    config.apiVersion = config.apiVersion || '2006-03-01';
    return new S3(config);
}
exports.createS3Connection = createS3Connection;
