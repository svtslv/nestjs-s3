import { DynamicModule, Module } from '@nestjs/common';
import { S3CoreModule } from './s3.core-module';
import { S3ModuleAsyncOptions, S3ModuleOptions } from './s3.interfaces';

@Module({})
export class S3Module {
  public static forRoot(
    options: S3ModuleOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: S3Module,
      imports: [S3CoreModule.forRoot(options, connection)],
      exports: [S3CoreModule],
    };
  }

  public static forRootAsync(
    options: S3ModuleAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: S3Module,
      imports: [S3CoreModule.forRootAsync(options, connection)],
      exports: [S3CoreModule],
    };
  }
}
