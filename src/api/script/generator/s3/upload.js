const config = require('config');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({
  region: config.get('aws.region'),
  credentials: {
    accessKeyId: config.get('aws.accessKeyId'),
    secretAccessKey: config.get('aws.secretAccessKey'),
  },
});

// Create S3 service object
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// call S3 to retrieve upload file to specified bucket
var uploadParams = {
  Bucket: config.get('aws.bucket'),
  Key: '',
  Body: undefined,
};
var file = process.argv[2];

// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function (err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
const { default: axios } = require('axios');
uploadParams.Key = path.basename(file);

const signedUrl = s3
  .getSignedUrlPromise('putObject', {
    Bucket: config.get('aws.bucket'),
    Key: uploadParams.Key,
    ContentType: `image/png`,
    Expires: 60 * 60,
  })
  .then(function (url) {
    console.log(url);
    axios
      .put(url, file, {
        headers: {
          'Content-Type': 'image/png',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  })
  .catch(function (err) {
    console.log(err);
  })
  .finally(function () {
    console.log('finally');
  });
