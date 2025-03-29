const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/productivityDB", { useNewUrlParser: true });

const timeSchema = new mongoose.Schema({ site: String, time: Number });
const TimeLog = mongoose.model("TimeLog", timeSchema);

app.post("/saveData", async (req, res) => {
  const data = req.body;
  for (let site in data) {
    await TimeLog.updateOne({ site }, { $inc: { time: data[site] } }, { upsert: true });
  }
  res.send("Data saved");
});

app.get("/getReport", async (req, res) => {
  const logs = await TimeLog.find();
  res.json(logs);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
