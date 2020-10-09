const passport = require("passport");
const jwt = require("jsonwebtoken");

// Keeping in case I want to add users in future

// Create
// exports.createGet = (req, res, next) => {
//   res.send("user create get");
// };

// exports.createPost = (req, res, next) => {
//   const { username, password, fullname } = req.body;

//   bcrypt.hash(password, 10, function (err, hashedPassword) {
//     new User({
//       username: username,
//       password: hashedPassword,
//       fullname: fullname,
//     }).save((err) => {
//       if (err) {
//         return next(err);
//       }
//       console.log("successfully saved user");
//       res.json({
//         message: "Successfully saved user"
//       })
//     });
//   });
// };

// Login
exports.loginGet = (req, res, next) => {
  res.send("login get");
};

exports.loginPost = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      return res.status(200).json({ user, token });
    });
  })(req, res);
};
