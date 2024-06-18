import { S3 } from 'aws-sdk';
import { readFileSync } from 'fs';
import { createHash } from 'crypto';
import logger from '../logger';

class S3Uploader {
  private static instance: S3Uploader;
  private s3Client: S3;

  private constructor(accessKeyId: string, secretAccessKey: string) {
    this.s3Client = new S3({
      accessKeyId,
      secretAccessKey,
      sslEnabled: true,
    });
  }

  public static getInstance(accessKeyId: string, secretAccessKey: string): S3Uploader {
    if (!S3Uploader.instance) {
      S3Uploader.instance = new S3Uploader(accessKeyId, secretAccessKey);
    }

    return S3Uploader.instance;
  }

  public async uploadContent(filePath: string, fileName: string, bucketName: string) {
    try {
      const fileContent = readFileSync(filePath);
      const md5hash = createHash('md5').update(fileContent).digest('base64');

      const s3Params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
        ContentMD5: md5hash,
      };

      logger.log(`Uploading object ${fileName} in bucket ${bucketName}`);
      await this.s3Client.putObject(s3Params).promise();
      logger.log(`Object ${fileName} successfully uploaded in bucket ${bucketName}`);
    } catch (error) {
      logger.log(`Error uploading object ${fileName}:`);
      logger.error(error);
      throw error;
    }
  }
}

export default S3Uploader;

