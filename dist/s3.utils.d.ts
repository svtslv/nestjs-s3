import { S3ClientConfig } from '@aws-sdk/client-s3';
import { S3ModuleOptions } from './s3.interfaces';
export declare function getS3OptionsToken(connection: string): string;
export declare function getS3ConnectionToken(connection: string): string;
export declare function createS3Connection(options: S3ModuleOptions): S3ClientConfig;
