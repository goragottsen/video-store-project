const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongo = require("mongoose");

const Admin = require("../models/admin");

const router = express.Router();

// Creating admin for test (no actual user signup form exists in the app)
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const admin = new Admin({
        login: req.body.login,
        password: hash
      });
      admin.save()
      .then(result => {
        res.status(201).json({
          message: 'Admin created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
    });
});

router.post("/login", (req, res, next) => {

  let fetchedAdmin;
  Admin.findOne({login: req.body.login })
    .then(admin => {
      if(!admin) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      fetchedAdmin = admin;
      return bcrypt.compare(req.body.password, fetchedAdmin.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed!!"
        });
      }
      // Creates a new token based on input data
      const token = jwt.sign(
        { login: fetchedAdmin.login, adminId: fetchedAdmin._id },
        'secret_must_remain_a_secret',
        {expiresIn: "1h"});
        res.status(200).json({
          login: fetchedAdmin.login,
          token: token,
          expiresIn: 3600
        });
    })
    .catch(err => {
      return res.status(401).json({
        message: err,
        message: "Auth failed!!!"
      });
    });
});

module.exports = router;
