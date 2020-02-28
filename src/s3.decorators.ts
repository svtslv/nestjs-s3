import { Inject } from '@nestjs/common';
import { S3_INJECT_TOKEN } from './s3.constants'

export const InjectS3 = () => {
  return Inject(S3_INJECT_TOKEN);
};
