import { Injectable, BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { awsConfig } from './confiq/aws.config';
import { Errors } from 'src/common/errors/errors';

@Injectable()
export class UploadService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
      region: awsConfig.region,
    });
  }

  async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
    if (!file || !file.mimetype.includes('pdf')) {
      throw new BadRequestException(Errors.INVALID_FILE_TYPE.message);
    }
    const params = {
      Bucket: awsConfig.bucketName,
      Key: `${userId}/resumes/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await this.s3.upload(params).promise();
    return data.Location;
  }

  async uploadAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    if (
      !file ||
      (!file.mimetype.includes('png') &&
        !file.mimetype.includes('jpeg') &&
        !file.mimetype.includes('jpg') &&
        !file.mimetype.includes('gif') &&
        !file.mimetype.includes('bmp') &&
        !file.mimetype.includes('tiff'))
    ) {
      throw new BadRequestException(Errors.INVALID_FILE_TYPE.message);
    }
    const params = {
      Bucket: awsConfig.bucketName,
      Key: `${userId}/avatars/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await this.s3.upload(params).promise();
    return data.Location;
  }
  async makeFilePublic(key: string): Promise<void> {
    const params = {
      Bucket: awsConfig.bucketName,
      Key: key,
      ACL: 'public-read',
    };

    await this.s3.putObjectAcl(params).promise();
  }
  // async generatePresignedUrl(key: string): Promise<string> {
  //   const params = {
  //     Bucket: 'jobconnect-cv',
  //     Key: key,
  //     Expires: 60 * 60,
  //   };
  //   return this.s3.getSignedUrl('getObject', params);
  // }
}
