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
  // passport.use(
  //   'local-signup',
  //   new LocalStrategy(
  //     {
  //       usernameField: 'email',
  //       passwordField: 'password',
  //       passReqToCallback: true,
  //     },
  //     function (req, email, password, done) {
  //       if (email) email = email.toLowerCase();

  //       User.findOne({ email: email }, function (err, foundUser) {
  //         if (err) {
  //           return done(err);
  //         }

  //         if (foundUser) {
  //           console.log('Error, already');
  //           return done(
  //             null,
  //             false,
  //             req.flash('signupMessage', 'That email is already taken.')
  //           );
  //         } else {
  //           User.register(email, password);
  //           User.register({ username: email }, password, function (
  //                 err,
  //                 user
  //               ) {
  //                 if (err) {

  //                 } else {
  //                   passport.authenticate('local')(req, res, function () {
  //                     res.redirect('/main');
  //                   });
  //                 }
  //               });
  //         }
  //       });
  //     }
  //   )
  // );
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  return passport;
};
