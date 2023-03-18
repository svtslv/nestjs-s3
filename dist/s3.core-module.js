"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var S3CoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3CoreModule = void 0;
const common_1 = require("@nestjs/common");
const s3_utils_1 = require("./s3.utils");
let S3CoreModule = S3CoreModule_1 = class S3CoreModule {
    static forRoot(options, connection) {
        const s3OptionsProvider = {
            provide: (0, s3_utils_1.getS3OptionsToken)(connection),
            useValue: options,
        };
        const s3ConnectionProvider = {
            provide: (0, s3_utils_1.getS3ConnectionToken)(connection),
            useValue: (0, s3_utils_1.createS3Connection)(options),
        };
        return {
            module: S3CoreModule_1,
            providers: [
                s3OptionsProvider,
                s3ConnectionProvider,
            ],
            exports: [
                s3OptionsProvider,
                s3ConnectionProvider,
            ],
        };
    }
    static forRootAsync(options, connection) {
        const s3ConnectionProvider = {
            provide: (0, s3_utils_1.getS3ConnectionToken)(connection),
            useFactory(options) {
                return (0, s3_utils_1.createS3Connection)(options);
            },
            inject: [(0, s3_utils_1.getS3OptionsToken)(connection)],
        };
        return {
            module: S3CoreModule_1,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options, connection), s3ConnectionProvider],
            exports: [s3ConnectionProvider],
        };
    }
    static createAsyncProviders(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useExisting || options.useFactory) {
            return [
                this.createAsyncOptionsProvider(options, connection)
            ];
        }
        return [
            this.createAsyncOptionsProvider(options, connection),
            { provide: options.useClass, useClass: options.useClass },
        ];
    }
    static createAsyncOptionsProvider(options, connection) {
        if (!(options.useExisting || options.useFactory || options.useClass)) {
            throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
        }
        if (options.useFactory) {
            return {
                provide: (0, s3_utils_1.getS3OptionsToken)(connection),
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: (0, s3_utils_1.getS3OptionsToken)(connection),
            async useFactory(optionsFactory) {
                return await optionsFactory.createS3ModuleOptions();
            },
            inject: [options.useClass || options.useExisting],
        };
    }
};
S3CoreModule = S3CoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], S3CoreModule);
exports.S3CoreModule = S3CoreModule;
