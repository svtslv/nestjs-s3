import { Module, DynamicModule, Provider } from "@nestjs/common";
import { S3ModuleOptions, S3ModuleAsyncOptions } from './s3.interfaces';
import { createS3Connection, getS3ConnectionToken, getS3OptionsToken } from './s3.utils'

@Module({})
export class S3Module {
  static forRoot(options: S3ModuleOptions, connection?: string): DynamicModule {

    const S3OptionsProvider: Provider = {
      provide: getS3OptionsToken(connection),
      useValue: options,
    };

    const S3ConnectionProvider: Provider = {
      provide: getS3ConnectionToken(connection),
      useValue: createS3Connection(options),
    };

    return {
      module: S3Module,
      providers: [
        S3OptionsProvider,
        S3ConnectionProvider,
      ],
      exports: [
        S3OptionsProvider,
        S3ConnectionProvider,
      ],
    };
  }

  static forRootAsync(options: S3ModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: S3Module,
      imports: [S3Module.forRootAsync(options, connection)],
    };
  }
}
