/** @format */

const express = require("express");
const connectDB = require("./config/db");
const Videos = require("./routes/api/Videos");
const Admins = require("./routes/api/Admins");
const Articles = require("./routes/api/Articles");
const Researches = require("./routes/api/Researches");
const Books = require("./routes/api/Books");
const Links = require("./routes/api/Links");
const Questions = require("./routes/api/Questions");

const fileUpload = require("express-fileupload");

const app = express();

connectDB();
app.use(express.json({ extended: false }));
app.use(fileUpload());
app.get("/", (req, res) => res.send("API is Running "));
app.use("/api/Videos", require("./routes/api/Videos"));
app.put("/api/Videos/:id", require("./routes/api/Videos"));
app.put("/api/Questions/:id", require("./routes/api/Questions"));
app.put("/api/Articles/:id", require("./routes/api/Articles"));
app.put("/api/Links/:id", require("./routes/api/Links"));
app.put("/api/Researches/:id", require("./routes/api/Researches"));
app.put("/api/Books/:id", require("./routes/api/Books"));
app.use("/api/Admins", require("./routes/api/Admins"));
app.use("/api/Articles", require("./routes/api/Articles"));
app.use("/api/Articles/:id", require("./routes/api/Articles"));
app.get("/api/Articles/:id", require("./routes/api/Articles"));
app.use("/api/Researches", require("./routes/api/Researches"));
app.use("/api/Auth", require("./routes/api/Auth"));
app.use("/api/Books", require("./routes/api/Books"));
app.use("/api/Links", require("./routes/api/Links"));
app.use("/api/Questions", require("./routes/api/Questions"));

//upload file
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;

  file.mv(
    `${__dirname}/islamicpsychology/public/uploads/${file.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
