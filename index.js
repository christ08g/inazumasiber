const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const path = require('path');

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

require("dotenv").config();
const app = express();
app.use(cookieParser('secret'));
const PORT = process.env.PORT || 5734;

const initializePassport = require("./passportConfig");

initializePassport(passport);
// Middleware

// Parses details from a form
app.use(express.json());
app.use(express.static(__dirname + '/assets'));
app.use( express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'static')));

app.use('/gud',express.static(path.join(__dirname,'static')));
app.set("view engine", "ejs");
app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we d>
    resave: false,
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app>
app.use(passport.session());
app.use(flash());
//app.get("/", (req, res) => {
    //res.render("index");
  //});
app.get("/", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  //console.log(req.session.flash.error);
  res.render("login.ejs");
});
app.get("/gud/success", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("gud", { user: req.user.username });
});

app.get("/users/register", checkAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.get("/gud/logout", (req, res,next) => {
  //req.logout();
  //res.render("index", { message: "You have logged out successfully" });
  //res.redirect("/");

  //req.logout(function(err) {
    //if (err) { return next(err); }
    //res.render("index", { message: "You have logged out successfully" });
    //res.redirect("/");
//});

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // if you're using express-flash
    req.flash('success_msg', 'Session terminated');
    res.redirect("/");
  });
});


app.post(
  "/",
  passport.authenticate("local", {
   successRedirect: "/gud/success",
    failureRedirect: "/",
    session: false
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/gud/success");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render('gud');
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
