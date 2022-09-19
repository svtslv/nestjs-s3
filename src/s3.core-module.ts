import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import {
  S3ModuleAsyncOptions,
  S3ModuleOptions,
  S3ModuleOptionsFactory,
} from './s3.interfaces';
import {
  createS3Connection,
  getS3OptionsToken,
  getS3ConnectionToken,
} from './s3.utils';

@Global()
@Module({})
export class S3CoreModule {
  /* forRoot */
  static forRoot(options: S3ModuleOptions, connection?: string): DynamicModule {
    const s3OptionsProvider: Provider = {
      provide: getS3OptionsToken(connection),
      useValue: options,
    };

    const s3ConnectionProvider: Provider = {
      provide: getS3ConnectionToken(connection),
      useValue: createS3Connection(options),
    };

    return {
      module: S3CoreModule,
      providers: [s3OptionsProvider, s3ConnectionProvider],
      exports: [s3OptionsProvider, s3ConnectionProvider],
    };
  }

  /* forRootAsync */
  public static forRootAsync(
    options: S3ModuleAsyncOptions,
    connection: string,
  ): DynamicModule {
    const s3ConnectionProvider: Provider = {
      provide: getS3ConnectionToken(connection),
      useFactory(options: S3ModuleOptions) {
        return createS3Connection(options);
      },
      inject: [getS3OptionsToken(connection)],
    };

    return {
      module: S3CoreModule,
      imports: options.imports,
      providers: [
        ...S3CoreModule.createAsyncProviders(options, connection),
        s3ConnectionProvider,
      ],
      exports: [s3ConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(
    options: S3ModuleAsyncOptions,
    connection?: string,
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    if (options.useExisting || options.useFactory) {
      return [S3CoreModule.createAsyncOptionsProvider(options, connection)];
    }

    return [
      S3CoreModule.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(
    options: S3ModuleAsyncOptions,
    connection?: string,
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        'Invalid configuration. Must provide useFactory, useClass or useExisting',
      );
    }

    if (options.useFactory) {
      return {
        provide: getS3OptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getS3OptionsToken(connection),
      async useFactory(
        optionsFactory: S3ModuleOptionsFactory,
      ): Promise<S3ModuleOptions> {
        return await optionsFactory.createS3ModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}
