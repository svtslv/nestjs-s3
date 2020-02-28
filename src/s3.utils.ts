import { S3ModuleOptions } from "./s3.interfaces";
import * as S3 from 'aws-sdk/clients/s3';

export function createS3Client(options: S3ModuleOptions): S3 {
  const { config } = options;
  config.apiVersion =  config.apiVersion || '2006-03-01';
  return new S3(config);
}
