import http from "http";
import createError from "http-errors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import logger from "morgan";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import connectMongo from "connect-mongo";
import models from "./models.js";
const User = models.User;
import dbRouter from "./routes/databaseAccess.js";
import authRouter from "./routes/auth.js";
import pinsRouter from './routes/pins.js'
import cookiesRouter from "./routes/cookies.js";
import transcriptRoutes from "./routes/transcript.js";
import sha256 from "crypto-js/sha256";
import hex from "crypto-js/enc-hex";
import CryptoJS from "crypto-js";
import cloudinaryRoutes from "./routes/cloudinary.js";
import cors from 'cors'
import cookieParser from 'cookie-parser';
const allowedOrigins = ['http://localhost:3000',
                      'http://localhost:5000'];


// ========== Basic connections and server initialization =============

const MongoStore = connectMongo(session);
mongoose
  .connect(process.env.MONGODB_URI, {
    newUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.error(err);
  });
const app = express();
const server = require("http").Server(app);

// ========== Middleware =============
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/db", dbRouter);

// ========== Passport =============
function hashPassword(password) {
  return CryptoJS.AES.encrypt(password, "secret key 123").toString();
}

app.use(
  session({
    secret: "sample secret",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//====== initializing passport middleware ======
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
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
app.use('/transcript', transcriptRoutes)
app.use('/cookies', cookiesRouter)
app.use('/pins', pinsRouter)

// ========== Port init =============
const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server listening on port: ${port}`);
// });
server.listen(port, () => {
  console.log("Express started. Listening on %s", port);
});
