/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const Video = require("../../Models/Video");
const auth = require("../../middleware/auth");

router.post(
  "/",
  [
    auth,
    [
      check("VideoTitle", " Please type the title of the video ")
        .not()
        .isEmpty(),

      check("VideoLink", " Please insert a valid link").not().isEmpty(),

      check("VideoSummary", "Please insert a summary of the video link")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { VideoLink, VideoTitle, VideoSummary, VideoPublishDate } = req.body;

    const VideoFields = {};
    VideoFields.id = req.admin.id;
    if (VideoLink) VideoFields.VideoLink = VideoLink;
    if (VideoTitle) VideoFields.VideoTitle = VideoTitle;
    if (VideoSummary) VideoFields.VideoSummary = VideoSummary;
    if (VideoPublishDate) VideoFields.VideoPublishDate = VideoPublishDate;

    try {
      let video = await Video.findOne({ admin: req.admin.id });

      if (video) {
        //update
        video = await Video.findOneAndUpdate(
          { admin: req.admin.id },
          { $set: VideoFields },
          { new: true }
        );
        return res.json(video);
      }

      //Create
      video = new Video(VideoFields);
      await video.save();
      res.json(video);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Get List
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Get by id
router.get("/:id", async (req, res) => {
  try {
    const videos = await Video.findById(req.params.id);
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server");
  }
});

//Update Video
router.put("/:id", async (req, res) => {
  await Video.findByIdAndUpdate(req.params.id)
    .then((video) => {
      video.VideoLink = req.body.VideoLink;
      video.VideoTitle = req.body.VideoTitle;
      video.VideoSummary = req.body.VideoSummary;

      video
        .save()
        .then(() => res.json("The Video has been updated successfully"))
        .catch((err) => res.status(400).json(`Error:${err}`));
    })
    .catch((err) => res.status(400).json(`Error:${err}`));
});

//Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    await Video.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Video deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
