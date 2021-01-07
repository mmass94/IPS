/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const Question = require("../../Models/Questions");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    auth,
    [
      check("QString", " Please insert the question").not().isEmpty(),
      check("Answer", "Please type the answer of the question").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { QString, Answer } = req.body;

    const QuestionFields = {};
    QuestionFields.id = req.admin.id;
    if (QString) QuestionFields.QString = QString;
    if (Answer) QuestionFields.Answer = Answer;

    try {
      let question = await Question.findOne({ admin: req.admin.id });

      if (question) {
        //update
        question = await question.findOneAndUpdate(
          { admin: req.admin.id },
          { $set: QuestionFields },
          { new: true }
        );
        return res.json(question);
      }

      //Create
      question = new Question(QuestionFields);
      await question.save();
      res.json(Question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get List
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ _id: -1 });
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Get by id
router.get("/:id", async (req, res) => {
  try {
    const questions = await Question.findById(req.params.id);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Update Question
router.put("/:id", async (req, res) => {
  await Question
    .findByIdAndUpdate(req.params.id)
    .then((question) => {
      question.QString = req.body.QString;
      question.Answer = req.body.Answer;

      question
        .save()
        .then(() => res.json("Quesion has been updated successfully"))
        .catch((err) => res.status(400).json(`Error:${err}`));
    })
    .catch((err) => res.status(400).json(`Error:${err}`));
});

//Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Question.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Question deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
