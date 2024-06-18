import S3Uploader from './s3';

function createS3Instance(accessKeyId: string, secretAccessKey: string) {
    return S3Uploader.getInstance(accessKeyId, secretAccessKey);
}

export default createS3Instance;
