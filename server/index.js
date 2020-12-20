import http from 'http';
import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import connectMongo from 'connect-mongo';
import models from './models.js'
const User = models.User;
import dbRouter from './routes/databaseAccess.js';
import authRouter from './routes/auth.js';
import sha256 from 'crypto-js/sha256';
import hex from 'crypto-js/enc-hex'
import CryptoJS from 'crypto-js';
import cloudinaryRoutes from './routes/cloudinary.js'

// ========== Basic connections and server initialization =============

const MongoStore = connectMongo(session);
mongoose.connect(process.env.MONGODB_URI, {
  newUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected...");
})
.catch((err) => {
  console.error(err)
})
const app = express();
const server = require('http').Server(app);

// ========== Middleware =============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/db', dbRouter);

// ========== Passport =============
function hashPassword(password) {
  return CryptoJS.AES.encrypt(password, 'secret key 123').toString();
}

app.use(session({
  secret: 'sample secret',
  store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

//====== initializing passport middleware ======
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log("====USERNAME====", username)
    console.log("====PASSWORD====", password)
    console.log("====HASHED PASSWORD====", hashPassword(password))
    User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log("====NO USER FOUND=====")
        return done(null);
      } else if (user.password === sha256(password).toString()) {
        console.log("====USER FOUND!!!!=====")
        return done(null, user);
      } else {
        console.log("====NULL USER=====")
        return done(null);
      }
    })
    .catch((err) => {
      return done(err);
    });
  }
));

app.use('/', authRouter(passport));
app.use('/cloudinary', cloudinaryRoutes)

// ========== Port init =============
const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port: ${port}`);
// });
server.listen(port, () => {
  console.log('Express started. Listening on %s', port);
});
