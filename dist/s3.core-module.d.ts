import { DynamicModule, Provider } from '@nestjs/common';
import { S3ModuleAsyncOptions, S3ModuleOptions } from './s3.interfaces';
export declare class S3CoreModule {
    static forRoot(options: S3ModuleOptions, connection?: string): DynamicModule;
    static forRootAsync(options: S3ModuleAsyncOptions, connection: string): DynamicModule;
    static createAsyncProviders(options: S3ModuleAsyncOptions, connection?: string): Provider[];
    static createAsyncOptionsProvider(options: S3ModuleAsyncOptions, connection?: string): Provider;
}
