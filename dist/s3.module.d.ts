import { DynamicModule } from '@nestjs/common';
import { S3ModuleAsyncOptions, S3ModuleOptions } from './s3.interfaces';
export declare class S3Module {
    static forRoot(options: S3ModuleOptions, connection?: string): DynamicModule;
    static forRootAsync(options: S3ModuleAsyncOptions, connection?: string): DynamicModule;
}
