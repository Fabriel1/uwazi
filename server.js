/* eslint-disable */
require('es6-promise').polyfill(); // Required in some browsers

//babel polyfill ES6
require('babel-core/register')();

require.extensions['.scss'] = function () { return; };
require.extensions['.css'] = function () { return; };

var express = require('express');
var path = require('path');
var compression = require('compression');
const app = express();

var http = require('http').Server(app);
var privateInstanceMiddleware = require('./app/api/auth/privateInstanceMiddleware.js');
var bodyParser = require('body-parser');
var uploadsFolder = require('./app/api/config/paths').uploadDocumentsPath;

var error_handling_middleware = require('./app/api/utils/error_handling_middleware.js');
app.use(error_handling_middleware);

app.use(compression());
var oneYear = 31557600;

var maxage = 0;
if (app.get('env') === 'production') {
  maxage = oneYear;
}

app.use(express.static(path.resolve(__dirname, 'dist'), {maxage: maxage}));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
require('./app/api/auth/routes.js')(app);
app.use(privateInstanceMiddleware);
app.use('/flag-images', express.static(path.resolve(__dirname, 'dist/flags')));
app.use('/uploaded_documents', express.static(uploadsFolder));

require('./app/api/api.js')(app, http);
require('./app/react/server.js')(app);
var dbConfig = require('./app/api/config/database');
var translations = require('./app/api/i18n/translations.js');
var systemKeys = require('./app/api/i18n/systemKeys.js');
var ports = require('./app/api/config/ports.js');
const port = ports[app.get('env')];

// Error logging needs to be after the last route
var error_logging_middleware = require('./app/api/utils/error_logging_middleware.js');
app.use(error_logging_middleware);

var errorLog = require('./app/api/log/errorLog.js').createErrorLog();

process.on('unhandledRejection', err => {
  let result = err;
  if (err instanceof Error) {
    result = err.stack.split('\n');
  }

  if (err.code) {
    result = err.message;
  }

  errorLog.error(result);
});

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect(dbConfig[app.get('env')], {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.info('==> Processing system keys...')
  translations.processSystemKeys(systemKeys)
  .then(function() {
    http.listen(port, '0.0.0.0', function onStart(err) {
      if (err) {
        console.log(err);
      }
      console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
      if (process.env.HOT) {
        console.info('');
        console.info('webpack is watching...');
        console.info(require('./message'));
      }
    });
  })
  .catch(console.log);
});
