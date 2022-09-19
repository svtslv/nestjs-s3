import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import * as AWS from 'aws-sdk';
export type S3 = AWS.S3;

export interface S3ModuleOptions {
  config: AWS.S3.ClientConfiguration;
}

export interface S3ModuleOptionsFactory {
  createS3ModuleOptions(): Promise<S3ModuleOptions> | S3ModuleOptions;
}

export interface S3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<S3ModuleOptionsFactory>;
  useExisting?: Type<S3ModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<S3ModuleOptions> | S3ModuleOptions;
}
