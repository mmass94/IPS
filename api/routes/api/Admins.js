/** @format */
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Admin = require("../../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    check("FullName", " Please type your full Name ").not().isEmpty(),

    check("Username", " Please choose a username").not().isEmpty(),

    check("Password", "Please choose a password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { FullName, Username, Password } = req.body;

    try {
      let admin = await Admin.findOne({ Username });

      if (admin) {
        return res
          .status(400)
          .json({ error: [{ msg: "Admin is already exist" }] });
      }

      admin = new Admin({
        FullName,
        Username,
        Password,
      });

      const salt = await bcrypt.genSalt(10);
      admin.Password = await bcrypt.hash(Password, salt);

      await admin.save();
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

//get
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find().sort({ _id: -1 });
    res.json(admins);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('server')

  }
});




//Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Admin.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Admin deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



/* update request
router.route("/:id",auth, async (req, res) => {
  try {
    await Admin.findByIdAndUpdate({ _id: req.params.id } ,{$set:req.body})
    res.json({ msg: "Admin Updated" });

    } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});*/



router.route("/:id").put((req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

module.exports = router;
