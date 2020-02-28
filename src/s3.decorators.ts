import { Inject } from '@nestjs/common';
import { S3_MODULE_TOKEN } from './s3.constants'

export const InjectS3 = () => {
  return Inject(S3_MODULE_TOKEN);
};
