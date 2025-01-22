# Course Selling Application using MERN Stack

### Clone this Repo using: https://github.com/shubh-kk/course-selling-app.git

### Fetures : 
- Passwords are stored in Hashed Format in Database
- Zod validation for correct inputs from user

### Technologies Used: 
- Express.js
- Node.js
- MongoDB

## Libraries Used
- zod: for schema validation
- mongoose: data validation (for DB)
- bcrypt: Hashing Passwords
- jsonwebtoken (jwt): for authorization

## Some Extra Things 
- .env file: for key store
- .env.example: for ".env" file structure to know
- seperate routes and middlewares folder
- added Routing for Clean Code Practise

### Sample Eg. For hashing passwords
const bcrypt = require("bcrypt");

async function passwordHashTest(password) {
  const hash = await bcrypt.hash(password, 5);

  const result = await bcrypt.compare(password, hash);
  console.log(result); // true
}

passwordHashTest("generic"); 

---
- Create the frontend
- rate limitting middleware