/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const Link = require("../../Models/Links");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    auth,
    [
      check("LinkString", " Please insert the link").not().isEmpty(),
      check("LinkDiscription", "Please type the link discription a photo link")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { LinkString, LinkDiscription } = req.body;

    const LinkFields = {};
    LinkFields.id = req.admin.id;
    if (LinkString) LinkFields.LinkString = LinkString;
    if (LinkDiscription) LinkFields.LinkDiscription = LinkDiscription;

    try {
      let link = await Link.findOne({ admin: req.admin.id });

      if (link) {
        //update
        link = await Link.findOneAndUpdate(
          { admin: req.admin.id },
          { $set: LinkFields },
          { new: true }
        );
        return res.json(link);
      }

      //Create
      link = new Link(LinkFields);
      await link.save();
      res.json(link);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get List
router.get("/", async (req, res) => {
  try {
    const links = await Link.find().sort({ _id: -1 });
    res.json(links);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Get by id
router.get("/:id", async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);
    res.json(links);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Update Link
router.put("/:id", async (req, res) => {
  await Link.findByIdAndUpdate(req.params.id)
    .then((link) => {
      link.LinkString = req.body.LinkString;
      link.LinkDiscription = req.body.LinkDiscription;

      link
        .save()
        .then(() => res.json("Link has been updated successfully"))
        .catch((err) => res.status(400).json(`Error:${err}`));
    })
    .catch((err) => res.status(400).json(`Error:${err}`));
});

//Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Link.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Link deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
