const interviewRoute = require("express").Router();
const { body, validationResult, query } = require("express-validator");
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

interviewRoute.get(
  "/",
  [query("applicantId").isInt()],
  authenticateToken,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { applicantId } = req.query;

    try {
      const interviews = await prisma.interview.findMany({
        where: { applicantId: parseInt(applicantId) },
      });
      res.status(200).json(interviews);
    } catch (error) {
      logger.error("Error retrieving interviews: ", error);
      next(new AppError("Error retrieving interviews", 500));
    }
  }
);

interviewRoute.post(
  "/",
  [
    body("applicantId").isInt(),
    body("interviewDate").isISO8601(),
    body("interviewerName").isString().notEmpty(),
  ],
  authenticateToken,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { applicantId, interviewDate, interviewerName } = req.body;

    try {
      const newInterview = await prisma.interview.create({
        data: { applicantId, interviewDate, interviewerName },
      });
      res.status(201).json(newInterview);
    } catch (error) {
      logger.error("Error scheduling interview: ", error);
      next(new AppError("Error scheduling interview", 500));
    }
  }
);

module.exports = interviewRoute;
