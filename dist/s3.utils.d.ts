import { S3ModuleOptions } from "./s3.interfaces";
import * as S3 from 'aws-sdk/clients/s3';
export declare function getS3OptionsToken(connection: string): string;
export declare function getS3ConnectionToken(connection: string): string;
export declare function createS3Connection(options: S3ModuleOptions): S3;
