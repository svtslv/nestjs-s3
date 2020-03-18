# NestJS S3

<a href="https://www.npmjs.com/package/nestjs-s3"><img src="https://img.shields.io/npm/v/nestjs-s3.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-s3"><img src="https://img.shields.io/npm/l/nestjs-s3.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates S3 with Nest

## Installation

```bash
npm install nestjs-s3 aws-sdk
```

You can also use the interactive CLI

```sh
npx nestjs-modules
```

## Examples

```bash
docker run \
-p 9000:9000 \
-e MINIO_ACCESS_KEY=minio \
-e MINIO_SECRET_KEY=password \
minio/minio server /data
```

### S3Module.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { AppController } from './app.controller';

@Module({
  imports: [
    S3Module.forRoot({
      config: {
        accessKeyId: 'minio',
        secretAccessKey: 'password',
        endpoint: 'http://127.0.0.1:9000',
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### S3Module.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { AppController } from './app.controller';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: () => ({
        config: {
          accessKeyId: 'minio',
          secretAccessKey: 'password',
          endpoint: 'http://localhost:9000',
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectS3(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';

@Controller()
export class AppController {
  constructor(
    @InjectS3() private readonly s3: S3,
  ) {}

  @Get()
  async getHello() {
    try {
      await this.s3.createBucket({ Bucket: 'bucket' }).promise();
    } catch (e) {}

    try {
      const list = await this.s3.listBuckets().promise();
      return list.Buckets;
    } catch (e) {
      console.log(e);
    }
  }
}
```

## License

MIT
