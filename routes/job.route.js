const jobRoute = require("express").Router();
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const winston = require("winston");
const authenticateToken = require("../middlewares/auth.middleware");

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

// POST /jobs - Create Job
jobRoute.post(
  "/",
  [
    body("title").isString().notEmpty(),
    body("department").isString().notEmpty(),
    body("description").isString().notEmpty(),
    body("openDate").isISO8601(),
  ],
  authenticateToken,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, department, description, openDate } = req.body;
    try {
      const newJob = await prisma.job.create({
        data: { title, department, description, openDate },
      });
      res.status(201).json(newJob);
    } catch (error) {
      logger.error("Error creating job: ", error);
      next(new AppError("Error creating job", 500));
    }
  }
);

jobRoute.get("/", authenticateToken, async (req, res, next) => {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200).json(jobs);
  } catch (error) {
    logger.error("Error retrieving jobs: ", error);
    next(new AppError("Error retrieving jobs", 500));
  }
});

module.exports = jobRoute;
