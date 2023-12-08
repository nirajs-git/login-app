const express = require("express");
const router = express.Router();
const user = require("../models/user");

router.get("/", (req, res) => {
  // Check if the user is already authenticated
  if (req.session.user) {
    // Redirect to the dashboard if authenticated
    res.redirect("/dashboard");
  } else {
    // Render the login page with the message from the session
    const msg = req.session.msg;
    req.session.msg = null; // Clear the message after using it
    res.render("login", { msg });
  }
});

router.get("/register", (req, res) => {
  // Check if the user is already authenticated
  if (req.session.user) {
    // Redirect to the dashboard if authenticated
    res.redirect("/dashboard");
  } else {
    // Render the register page if not authenticated
    res.render("register");
  }
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  user.createUser(name, email, password, (err) => {
    if (err) {
      req.session.msg = "Registration Failed..!";
    } else {
      req.session.msg = "Registration Successful..!";
    }
    res.redirect("/");
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  user.authenticateUser(email, password, (err, result) => {
    if (err || !result) {
      req.session.msg = "Login Failed..!";
      res.redirect("/");
    } else {
      req.session.user = result;
      req.session.msg = "Login Successful..!";
      res.redirect("/dashboard");
    }
  });
});

module.exports = router;
