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

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  return passport;
};
