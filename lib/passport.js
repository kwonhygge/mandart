module.exports = function (app, User) {
  const passport = require('passport');
  const session = require('express-session');
  const LocalStrategy = require('passport-local').Strategy;
  //session
  app.use(
    session({
      secret: 'Our little secret.',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      //Match User
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
      });

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  return passport;
};
