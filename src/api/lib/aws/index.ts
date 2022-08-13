import * as config from 'config';
import * as AWS from 'aws-sdk';
export const S3 = {
  self: new AWS.S3({
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey'),
    region: config.get('aws.region'),
  }),

  getObject: (option) => {
    const { key: Key, bucket: Bucket = config.get('aws.bucket') } = option;

    return S3.self
      .getObject({
        Bucket,
        Key,
      })
      .promise();
  },

  upload: (option) => {
    const {
      key: Key,
      body: Body,
      bucket: Bucket = config.get('aws.bucket'),
    } = option;

    return S3.self
      .upload({
        Bucket,
        Key,
        Body,
      })
      .promise();
  },

  putObject: (option) => {
    const {
      key: Key,
      body: Body,
      bucket: Bucket = config.get('aws.bucket'),
    } = option;

    return S3.self
      .putObject({
        Bucket,
        Key,
        Body,
      })
      .promise();
  },

  deleteObject: (option) => {
    const { key: Key, bucket: Bucket = config.get('aws.bucket') } = option;

    return S3.self
      .deleteObject({
        Bucket,
        Key,
      })
      .promise();
  },

  getSignedUrl: (option) => {
    const {
      key: Key,
      contentType = `image/png`,
      method = 'putObject',
      bucket: Bucket = config.get('aws.bucket'),
    } = option;

    const params: any = {
      Bucket,
      Key,
      Expires: 60 * 60,
    };
    if (method === 'putObject') {
      params.ContentType = contentType;
    }
    return S3.self.getSignedUrlPromise(method, params);
  },
};
