const bcrypt = require("bcryptjs");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Local Strategy
module.exports = passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          console.log("success");
          return done(null, user, {
            message: `Welcome back ${user.name}!`,
          });
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

// JWT Strategy
module.exports = passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwt_payload, done) => {
      if (jwt_payload.user.username === "admin") {
        return done(null, true);
      }
      return done(null, false);
    }
  )
);