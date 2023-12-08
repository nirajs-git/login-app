const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user || req.session.msg) {
    const userName = req.session.user.name;
    const userEmail = req.session.user.email;
    const msg = req.session.msg;
    res.render("dashboard", { msg, userName, userEmail });
  } else {
    res.redirect("/");
  }
});

router.post("/logout", (req, res) => {
  // Destroy the session and redirect to the login page
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session: " + err);
    }
    res.redirect("/");
  });
});

module.exports = router;
