/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const Research = require("../../Models/Researches");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    auth,
    [
      check("ResearchTitle", " Please type the title of the research ")
        .not()
        .isEmpty(),
      check("Researchphoto", "Please insert a photo link").not().isEmpty(),

      check("ResearchOverview", " Please insert an overview of the research ")
        .not()
        .isEmpty(),

      check("Researchdetails", "Please insert deails of the research")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      ResearchTitle,
      Researchphoto,
      ResearchOverview,
      Researchdetails,
      ResearchPublishDate,
    } = req.body;

    const ResearchFields = {};
    ResearchFields.id = req.admin.id;
    if (ResearchTitle) ResearchFields.ResearchTitle = ResearchTitle;
    if (Researchphoto) ResearchFields.Researchphoto = Researchphoto;
    if (ResearchOverview) ResearchFields.ResearchOverview = ResearchOverview;
    if (Researchdetails) ResearchFields.Researchdetails = Researchdetails;
    if (ResearchPublishDate)
      ResearchFields.ResearchPublishDate = ResearchPublishDate;

    try {
      let research = await Research.findOne({ admin: req.admin.id });

      if (research) {
        //update
        research = await Research.findOneAndUpdate(
          { admin: req.admin.id },
          { $set: ResearchFields },
          { new: true }
        );
        return res.json(research);
      }

      //Create
      research = new Research(ResearchFields);
      await research.save();
      res.json(research);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get List
router.get("/", async (req, res) => {
  try {
    const researches = await Research.find().sort({ _id: -1 });
    res.json(researches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Get by id
router.get("/:id", async (req, res) => {
  try {
    const researches = await Research.findById(req.params.id);
    res.json(researches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Update Research
router.put("/:id", async (req, res) => {
  await Research.findByIdAndUpdate(req.params.id)
    .then((research) => {
      research.ResearchTitle = req.body.ResearchTitle;
      research.Researchphoto = req.body.Researchphoto;
      research.ResearchOverview = req.body.ResearchOverview;
      research.Researchdetails = req.body.Researchdetails;

      research
        .save()
        .then(() => res.json("Research has been updated successfully"))
        .catch((err) => res.status(400).json(`Error:${err}`));
    })
    .catch((err) => res.status(400).json(`Error:${err}`));
});

//Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Research.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Research deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
