<h1 align="center"> 
  Authentication api
</h1>

<h2 align="center">
  <img src="https://i.imgur.com/U5e74Ml.png" width=50%" />
</h2>

<p align="center">
  <i> Authentication API schema </i>
</p>

<h3>What is JWT?</h3>

A JSON Web Token, or JWT, is used to send information that can be verified and trusted by means of a digital signature. 
It comprises a compact and URL-safe JSON object, which is cryptographically signed to verify its authenticity, 
and which can also be encrypted if the payload contains sensitive information.


<h3>What was used in the project?</h3>

Authentication method using to API is jwt. 
For a database NoSQL, i used [MongoDB atlas](https://www.mongodb.com/cloud/atlas), [Mongoose](https://mongoosejs.com/) to create models and to connect to express server, [Bcryptjs](https://www.npmjs.com/package/bcryptjs) to hash passwords and jwt to check for private routes.
