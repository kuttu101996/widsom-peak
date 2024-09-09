const express = require("express");
require("dotenv").config();
const cors = require("cors");
const interviewRoute = require("./routes/interview.route");
const jobRoute = require("./routes/job.route");
const applicantRoute = require("./routes/applicant.route");
const userRouter = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  return res.status(200).json({ message: "Hello from server!" });
});

app.use("/interviews", interviewRoute);
app.use("/jobs", jobRoute);
app.use("/applicants", applicantRoute);
app.use("/user", userRouter);

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(process.env.PORT, async () => {
  try {
    console.log("Server running at " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
