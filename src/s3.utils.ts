import { S3 } from '@aws-sdk/client-s3';
import { S3ModuleOptions } from './s3.interfaces';
import {
  S3_MODULE_CONNECTION,
  S3_MODULE_CONNECTION_TOKEN,
  S3_MODULE_OPTIONS_TOKEN,
} from './s3.constants';

export function getS3OptionsToken(connection: string): string {
  return `${connection || S3_MODULE_CONNECTION}_${S3_MODULE_OPTIONS_TOKEN}`;
}

export function getS3ConnectionToken(connection: string): string {
  return `${connection || S3_MODULE_CONNECTION}_${S3_MODULE_CONNECTION_TOKEN}`;
}

export function createS3Connection(options: S3ModuleOptions): S3 {
  const { config } = options;
  return new S3(config);
}
