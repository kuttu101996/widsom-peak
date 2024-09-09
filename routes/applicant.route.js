const applicantRoute = require("express").Router();
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

applicantRoute.post(
  "/",
  [
    body("jobId").isInt(),
    body("name").isString().notEmpty(),
    body("email").isEmail(),
    body("resumeLink").isString().notEmpty(),
    body("status").isIn(["Pending", "Interviewed", "Rejected", "Hired"]),
  ],
  authenticateToken,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId, name, email, resumeLink, status } = req.body;
    try {
      const newApplicant = await prisma.applicant.create({
        data: { jobId, name, email, resumeLink, status },
      });
      res.status(201).json(newApplicant);
    } catch (error) {
      logger.error("Error creating applicant: ", error);
      next(new AppError("Error creating applicant", 500));
    }
  }
);

applicantRoute.get(
  "/",
  [query("jobId").isInt()],
  authenticateToken,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobId } = req.query;
    try {
      const applicants = await prisma.applicant.findMany({
        where: { jobId: parseInt(jobId) },
      });
      res.status(200).json(applicants);
    } catch (error) {
      logger.error("Error retrieving applicants: ", error);
      next(new AppError("Error retrieving applicants", 500));
    }
  }
);

applicantRoute.patch(
  "/:applicantId",
  [body("status").isIn(["Pending", "Interviewed", "Rejected", "Hired"])],
  authenticateToken,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { applicantId } = req.params;
    const { status } = req.body;

    try {
      const updatedApplicant = await prisma.applicant.update({
        where: { id: parseInt(applicantId) },
        data: { status },
      });
      res.status(200).json(updatedApplicant);
    } catch (error) {
      logger.error("Error updating applicant: ", error);
      next(new AppError("Error updating applicant", 500));
    }
  }
);

applicantRoute.delete(
  "/:applicantId",
  authenticateToken,
  async (req, res, next) => {
    const { applicantId } = req.params;

    try {
      await prisma.applicant.delete({ where: { id: parseInt(applicantId) } });
      res.status(204).send();
    } catch (error) {
      logger.error("Error deleting applicant: ", error);
      next(new AppError("Error deleting applicant", 500));
    }
  }
);

module.exports = applicantRoute;
