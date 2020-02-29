import { Inject } from '@nestjs/common';
import { getS3ConnectionToken } from './s3.utils';

export const InjectS3 = (connection?) => {
  return Inject(getS3ConnectionToken(connection));
};
