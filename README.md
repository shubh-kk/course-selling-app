## Technologies Used
- Express.js, Node.js, MongoDB

## Libraries Used
- zod: for schema validation
- mongoose: data validation (for DB)
- bcrypt: Hashing Passwords
- jsonwebtoken (jwt): for authorization

## Extra 
- .env

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


 Good to haves
  - Use cookies instead of JWT for auth
  - Add a rate limiting middleware
  - Frontend in ejs (low pri)
  - Frontend in React