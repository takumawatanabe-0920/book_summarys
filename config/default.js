const mongoOptions = {
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
  autoIndex: true,
  serverSelectionTimeoutMS: 1000,
  readPreference: 'primaryPreferred',
  maxStalenessSeconds: 90,
};

module.exports = {
  port: 3010,
  host: 'http://localhost:',
  mongodb: {
    uri: 'mongodb+srv://takuma:Takuma0920@sharenotes.t8l9qnw.mongodb.net/test',
    options: mongoOptions,
    dbName: 'book_summarys',
  },
  aws: {
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.secretAccessKey,
    region: process.env.region,
    bucket: 'sharesummary',
  },
};
