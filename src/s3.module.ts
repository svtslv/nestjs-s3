import { Module, DynamicModule, Provider } from "@nestjs/common";
import { S3ModuleOptions, S3ModuleAsyncOptions } from './s3.interfaces';
import { S3_MODULE_OPTIONS, S3_MODULE_TOKEN } from './s3.constants'
import { createS3Client } from './s3.utils'

@Module({})
export class S3Module {
  static forRoot(options: S3ModuleOptions): DynamicModule {

    const S3ModuleOptions: Provider = {
      provide: S3_MODULE_OPTIONS,
      useValue: options,
    };

    const S3ConnectionProvider: Provider = {
      provide: S3_MODULE_TOKEN,
      useValue: createS3Client(options),
    };

    return {
      module: S3Module,
      providers: [
        S3ModuleOptions,
        S3ConnectionProvider,
      ],
      exports: [
        S3ModuleOptions,
        S3ConnectionProvider,
      ],
    };
  }

  static forRootAsync(options: S3ModuleAsyncOptions): DynamicModule {
    return {
      module: S3Module,
      imports: [S3Module.forRootAsync(options)],
    };
  }
}
