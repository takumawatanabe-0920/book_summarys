// const config = require('config');
// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region
// AWS.config.update({
//   region: config.get('aws.region'),
//   credentials: {
//     accessKeyId: config.get('aws.accessKeyId'),
//     secretAccessKey: config.get('aws.secretAccessKey'),
//   },
// });

// // Create S3 service object
// var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// // Create the parameters for calling createBucket
// var bucketParams = {
//   Bucket: process.argv[2],
// };

// // call S3 to create the bucket
// s3.createBucket(bucketParams, function (err, data) {
//   console.log({ err, data });
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log('Success', data.Location);
//   }
// });
