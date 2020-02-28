import { Module, DynamicModule, Provider } from "@nestjs/common";
import { S3ModuleOptions, S3ModuleAsyncOptions } from './s3.interfaces';
import { S3_MODULE_OPTIONS, S3_INJECT_TOKEN } from './s3.constants'
import { createS3Client } from './s3.utils'

@Module({})
export class S3Module {
  static forRoot(options: S3ModuleOptions): DynamicModule {

    const objectionModuleOptions: Provider = {
      provide: S3_MODULE_OPTIONS,
      useValue: options,
    };

    const objectionConnectionProvider: Provider = {
      provide: S3_INJECT_TOKEN,
      useValue: createS3Client(options),
    };

    return {
      module: S3Module,
      providers: [
        objectionModuleOptions,
        objectionConnectionProvider,
      ],
      exports: [
        objectionModuleOptions,
        objectionConnectionProvider,
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
