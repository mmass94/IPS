/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const Book = require("../../Models/Books");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    auth,
    [
      check("BookTitle", " Please type the title of the book ")
        .not()
        .isEmpty(),
      check("Bookhphoto", "Please insert a photo link").not().isEmpty(),

      check("BookDescription", " Please insert a description of the book ")
        .not()
        .isEmpty(),

      check("BookLink", "Please insert the link of the book")
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
      BookTitle,
      Bookhphoto,
      BookDescription,
      BookLink,
    } = req.body;

    const BookFields = {};
    BookFields.id = req.admin.id;
    if (BookTitle) BookFields.BookTitle = BookTitle;
    if (Bookhphoto) BookFields.Bookhphoto = Bookhphoto;
    if (BookDescription) BookFields.BookDescription = BookDescription;
    if (BookLink) BookFields.BookLink = BookLink;


    try {
      let book = await Book.findOne({ admin: req.admin.id });

      if (book) {
        //update
        book = await Book.findOneAndUpdate(
          { admin: req.admin.id },
          { $set: BookFields },
          { new: true }
        );
        return res.json(book);
      }

      //Create
      book = new Book(BookFields);
      await book.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get List
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ _id: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Get by id
router.get("/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Update Book
router.put("/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id)
    .then((book) => {
      book.BookTitle = req.body.BookTitle;
      book.Bookhphoto = req.body.Bookhphoto;
      book.BookDescription = req.body.BookDescription;
      book.BookLink = req.body.BookLink;

      book
        .save()
        .then(() => res.json("Book has been updated successfully"))
        .catch((err) => res.status(400).json(`Error:${err}`));
    })
    .catch((err) => res.status(400).json(`Error:${err}`));
});

//Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Book.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Book deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
