# AugiePilot

**AugiePilot** is a web application built with **Node.js, Express, HTML, CSS, and JavaScript** that allows users to register, log in, and interact with dynamic content. The project demonstrates authentication, database operations, responsive design, and interactive UI elements.

---

## Features

- User authentication with hashed passwords (**bcrypt**)  
- Flash messages for notifications (**connect-flash**)  
- Session management (**express-session**)  
- Dynamic pages using **EJS** and **EJS-Mate**  
- RESTful routes for creating, reading, updating, and deleting data  
- Middleware for checking if a user is logged in  
- Responsive design with animations and **burger menu**  
- Full CRUD operations connected to **MongoDB**  

---

## Technologies Used

- Node.js  
- Express  
- MongoDB / Mongoose  
- EJS / EJS-Mate  
- bcrypt (password hashing)  
- express-session (sessions)  
- connect-flash (flash messages)  
- method-override (for PUT/DELETE requests in forms)  
- HTML, CSS, JavaScript (responsive & interactive UI)  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/GeorgeKhachaturov/augie-pilot.git
cd augie-pilot
2. Install dependencies:

npm install

3. Create a .env file in the root folder and add your environment variables:

PORT=3000
MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_secret_key

4. Start the server:
node app.js

5.Open in browser:
http://localhost:3000

George Khachaturov

GitHub: GeorgeKhachaturov
Email: khachaturovgg@gmail.com
