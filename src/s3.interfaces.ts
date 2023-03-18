import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { S3ClientConfig } from '@aws-sdk/client-s3';

export interface S3ModuleOptions {
  config: S3ClientConfig;
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
