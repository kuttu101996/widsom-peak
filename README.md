<h1>Job Application Management API</h1>
Overview
This is a backend RESTful API built with Node.js, Express, and Prisma for managing job applications. It allows the creation of jobs, adding applicants, scheduling interviews, and managing job application statuses. Authentication is implemented using JWT.

Features
Job CRUD operations
Applicant CRUD operations
Interview scheduling
JWT-based authentication (register/login)
Validation and error handling
Deployed on Heroku or any cloud provider
Tech Stack
Node.js with Express
Prisma ORM with MySQL
JWT Authentication
bcrypt.js for password hashing
Winston for logging
Prerequisites
Node.js installed
MySQL or PostgreSQL database
Create a .env file with:
bash
Copy code
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_secret_key"
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/job-application-api.git
Install dependencies:

bash
Copy code
npm install
Migrate the database:

bash
Copy code
npx prisma migrate dev --name init
Run the server:

bash
Copy code
npm start
API Endpoints
Authentication
POST /register: Register a new user
POST /login: Login and generate a JWT
Jobs
POST /jobs: Create a job
GET /jobs: Retrieve all jobs
Applicants
POST /applicants: Add a new applicant
GET /applicants?jobId={jobId}: Get applicants for a job
PATCH /applicants/{applicantId}: Update applicant status
DELETE /applicants/{applicantId}: Delete an applicant
Interviews
POST /interviews: Schedule an interview
GET /interviews?applicantId={applicantId}: Get interviews for an applicant
Validation and Error Handling
Each route is equipped with:

Input validation using express-validator
Centralized error handling
Structured logging with winston
Deployment
You can deploy this app on Heroku, AWS, or any cloud platform. After deployment, ensure the .env file is correctly set up with your database credentials.

Testing
Run unit tests:

bash
Copy code
npm test
License
This project is licensed under the MIT License.
