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
  webOrigin: 'http://localhost:',
  mongodb: {
    uri: 'mongodb://127.0.0.1:27017/book_summarys?directConnection=true',
    options: mongoOptions,
    dbName: 'book_summarys',
  },
};
