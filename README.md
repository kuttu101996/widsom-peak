<h1>Job Application Management API</h1>
<p>A RESTful API built with Node.js, Express, and Prisma for managing job positions, applicants, and interviews, with JWT authentication and robust error handling.</p>
<h3>Features</h3>
<ul>
  <li>CRUD operations for jobs and applicants</li>
  <li>Schedule interviews</li>
  <li>JWT-based authentication (register/login)</li>
  <li>Input validation & error handling</li>
  <li>Logging with Winston</li>
</ul>
<br/>
<h3>Tech Stack</h3>
<ul>
  <li>Node.js, Express, Prisma</li>
  <li>JWT for authentication</li>
  <li>MySQL or PostgreSQL</li>
  <li>bcrypt.js for password hashing</li>
  <li>Winston for logging</li>
</ul>
<br />
<h3>Requirements</h3>
<ul>
  <li>Node.js</li>
  <li>MySQL or PostgreSQL</li>
</ul>
<br/>
<h3>Setup</h3>
<ol>
  <li>
    <h5>Clone the repository:</h5>
    git clone https://github.com/your-repo/job-application-api.git
    cd job-application-api
  </li>
  <li>
    <h5>Install dependencies:</h5>
    npm install
  </li>
  <li>
    <h5>Set up the environment: Create a .env file with the following content:</h5>
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="your_secret_key"
  </li>
  <li>
    <h5>Migrate the database:</h5>
    npx prisma migrate dev --name init
  </li>
  <li>
    <h5>Run the server:</h5>
    npm start
  </li>
</ol>
<h3>API Endpoints</h3>
<h5>Authentication</h5>
<ul>
  <li>POST /register - Register a new user</li>
  <li>POST /login - Login and get JWT token</li>
</ul>
<h5>Jobs</h5>
<ul>
  <li>POST /jobs - Create a new job</li>
  <li>GET /jobs - Get all job positions</li>
</ul>
<h5>Applicants</h5>
<ul>
  <li>POST /applicants - Add a new applicant for a job</li>
  <li>GET /applicants?jobId={jobId} - Get applicants for a specific job</li>
  <li>PATCH /applicants/{applicantId} - Update an applicant's status</li>
  <li>DELETE /applicants/{applicantId} - Delete an applicant</li>
</ul>
<h5>Interviews</h5>
<ul>
  <li>POST /interviews - Schedule an interview for an applicant</li>
  <li>GET /interviews?applicantId={applicantId} - Get interviews for an applicant</li>
</ul>
<h3>Validation & Error Handling</h3>
<ul>
  <li>Input validation is implemented using express-validator.</li>
  <li>Error handling is centralized with a custom AppError class and middleware.</li>
</ul>
<h3>Logging</h3>
<ul>
  <li>Winston is used for logging errors and system activities.</li>
</ul>
<h3>Deployment</h3>
<ul>
  <li>Deploy on Heroku, AWS, or any cloud platform. Ensure your .env is correctly configured in the environment.</li>
</ul>
