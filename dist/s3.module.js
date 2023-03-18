"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var S3Module_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Module = void 0;
const common_1 = require("@nestjs/common");
const s3_core_module_1 = require("./s3.core-module");
let S3Module = S3Module_1 = class S3Module {
    static forRoot(options, connection) {
        return {
            module: S3Module_1,
            imports: [s3_core_module_1.S3CoreModule.forRoot(options, connection)],
            exports: [s3_core_module_1.S3CoreModule],
        };
    }
    static forRootAsync(options, connection) {
        return {
            module: S3Module_1,
            imports: [s3_core_module_1.S3CoreModule.forRootAsync(options, connection)],
            exports: [s3_core_module_1.S3CoreModule],
        };
    }
};
S3Module = S3Module_1 = __decorate([
    (0, common_1.Module)({})
], S3Module);
exports.S3Module = S3Module;
