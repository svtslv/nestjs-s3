"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectS3 = void 0;
const common_1 = require("@nestjs/common");
const s3_utils_1 = require("./s3.utils");
const InjectS3 = (connection) => {
    return (0, common_1.Inject)((0, s3_utils_1.getS3ConnectionToken)(connection));
};
exports.InjectS3 = InjectS3;
