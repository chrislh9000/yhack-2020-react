import http from 'http';
import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import connectMongo from 'connect-mongo';
import dbRouter from './routes/databaseAccess.js';
// import authRouter from './routes/auth.js';
// import models from './models.js';

const MongoStore = connectMongo(session);
mongoose.connect(process.env.MONGODB_URI);
const app = express();
const server = require('http').Server(app);

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session({
//   // secret: process.env.SESSION_SECRET,
//   // store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   proxy: true,
//   resave: true,
//   saveUnitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });
//
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
//
// const hashPassword = (password) => {
//   const hash = crypto.createHash('sha256');
//   hash.update(password);
//   return hash.digest('hex');
// };
//
// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     User.findOne({ username: username })
//     .then((user) => {
//       if (!user) {
//         return done(null);
//       } else if (user.password === hashPassword(password)) {
//         return done(null, user);
//       } else {
//         return done(null);
//       }
//     })
//     .catch((err) => {
//       return done(err);
//     });
//   }
// ));
//
// app.use('/', authRouter(passport));
app.use('/db', dbRouter);

const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port: ${port}`);
// });
server.listen(port, () => {
  console.log('Express started. Listening on %s', port);
});
