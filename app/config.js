
var os = require('os');

var config = {
  DIR_TMP: os.tmpdir(),
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGOHQ_URI || 'mongodb://localhost:27017/myapp',
  WORKERS: process.env.WORKERS || os.cpus().length,
  SESSION_SECRET: process.env.SESSION_SECRET || 'mysessionsecretcode',
};

module.exports = config;
