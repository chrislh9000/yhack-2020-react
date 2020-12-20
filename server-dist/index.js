'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _models = require('./models.js');

var _models2 = _interopRequireDefault(_models);

var _databaseAccess = require('./routes/databaseAccess.js');

var _databaseAccess2 = _interopRequireDefault(_databaseAccess);

var _auth = require('./routes/auth.js');

var _auth2 = _interopRequireDefault(_auth);

var _sha = require('crypto-js/sha256');

var _sha2 = _interopRequireDefault(_sha);

var _encHex = require('crypto-js/enc-hex');

var _encHex2 = _interopRequireDefault(_encHex);

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _cloudinary = require('./routes/cloudinary.js');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;


// ========== Basic connections and server initialization =============

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
_mongoose2.default.connect(process.env.MONGODB_URI, {
  newUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("MongoDB Connected...");
}).catch(function (err) {
  console.error(err);
});
var app = (0, _express2.default)();
var server = require('http').Server(app);

// ========== Middleware =============
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/db', _databaseAccess2.default);

// ========== Passport =============
function hashPassword(password) {
  return _cryptoJs2.default.AES.encrypt(password, 'secret key 123').toString();
}

app.use((0, _expressSession2.default)({
  secret: 'sample secret',
  store: new MongoStore({ mongooseConnection: _mongoose2.default.connection })
}));

_passport2.default.serializeUser(function (user, done) {
  done(null, user._id);
});

_passport2.default.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

_passport2.default.use(new _passportLocal2.default(function (username, password, done) {
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    } else if (!user) {
      console.log(user);
      return done(null, false);
    } else {
      var hashedPassword = hashPassword(password);
      if (user.hashedPassword !== hashedPassword) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  });
}));

//====== initializing passport middleware ======
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use('/', (0, _auth2.default)(_passport2.default));
app.use('/cloudinary', _cloudinary2.default);

// ========== Port init =============
var port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port: ${port}`);
// });
server.listen(port, function () {
  console.log('Express started. Listening on %s', port);
});