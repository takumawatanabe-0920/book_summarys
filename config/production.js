require('dotenv').config();
const mongoOptions = {
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
  autoIndex: true,
  serverSelectionTimeoutMS: 1000,
  readPreference: 'primaryPreferred',
  maxStalenessSeconds: 90,
};
console.log({ env: process.env });
module.exports = {
  port: 3020,
  mongodb: {
    uri: `mongodb+srv://takuma:Takuma0920@sharenotes.t8l9qnw.mongodb.net/test`,
    options: mongoOptions,
    dbName: 'book_summarys',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
    bucket: 'sharesummary',
  },
};
