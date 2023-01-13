const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialPlatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;