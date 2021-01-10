/** @format */

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Admin = require("../../Models/Admin");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("Username", " Please enter your username").not().isEmpty(),

    check("Password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Username, Password } = req.body;

    try {
      let admin = await Admin.findOne({ Username });

      if (!admin) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }

      const IsMatch = await bcrypt.compare(Password, admin.Password);
      if (!IsMatch) {
        return res
          .status(400)
          .json({ error: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
