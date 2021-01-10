/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Article = require("../../Models/Articles");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    auth,
    [
      check("ArticleTitle", " Please type the title of the article ")
        .not()
        .isEmpty(),
      check("Articlephoto", "  Please insert the link of the Article photo ")
        .not()
        .isEmpty(),
      check("ArticleAuthor", "  Please type the name of the author ")
        .not()
        .isEmpty(),
      check("ArticleSource", "  Please type the source of the article ")
        .not()
        .isEmpty(),
      check("ArticleOverview", "  Please type an overview of the article ")
        .not()
        .isEmpty(),
      check("Articledetails", "  Please insert the details of the article ")
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
      ArticleTitle,
      Articlephoto,
      ArticleAuthor,
      ArticleSource,
      ArticleOverview,
      Articledetails,
      ArticlePublishDate,
    } = req.body;

    const ArticleFields = {};
    ArticleFields.id = req.admin.id;
    if (ArticleTitle) ArticleFields.ArticleTitle = ArticleTitle;
    if (Articlephoto) ArticleFields.Articlephoto = Articlephoto;
    if (ArticleAuthor) ArticleFields.ArticleAuthor = ArticleAuthor;
    if (ArticleSource) ArticleFields.ArticleSource = ArticleSource;
    if (ArticleOverview) ArticleFields.ArticleOverview = ArticleOverview;
    if (Articledetails) ArticleFields.Articledetails = Articledetails;
    if (ArticlePublishDate)
      ArticleFields.ArticlePublishDate = ArticlePublishDate;

    try {
      let article = await Article.findOne({ admin: req.admin.id });

      if (article) {
        //update
        article = await Article.findOneAndUpdate(
          { admin: req.admin.id },
          { $set: ArticleFields },
          { new: true }
        );
        return res.json(article);
      }

      //Create
      article = new Article(ArticleFields);
      await article.save();
      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get by id
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ _id: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Update Article
router.put("/:id", async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id)
    .then((article) => {
      article.ArticleTitle = req.body.ArticleTitle;
      article.Articlephoto = req.body.Articlephoto;
      article.ArticleAuthor = req.body.ArticleAuthor;
      article.ArticleSource = req.body.ArticleSource;
      article.ArticleOverview = req.body.ArticleOverview;
      article.Articledetails = req.body.Articledetails;

      article
        .save()
        .then(() => res.json("Article has been updated successfully"))
        .catch((err) => res.status(400).json(`Error:${err}`));
    })
    .catch((err) => res.status(400).json(`Error:${err}`));
});

//Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Article.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Article deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
