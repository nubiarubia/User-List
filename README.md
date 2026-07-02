# REST API – User List

This project is a simple REST API built using **Node.js**, **Express**, and **MongoDB Atlas**.  
It supports full CRUD operations (Create, Read, Update, Delete) for managing a list of users.

---

## Features

### ✔ GET – Retrieve all users  
Endpoint: `GET /api/users/`  
Returns an array of all users stored in MongoDB.

### ✔ POST – Add a new user  
Endpoint: `POST /api/users/add`  
Accepts a JSON body containing:
```json
{
  "id": Number,
  "email": String,
  "username": String
}

### ✔ PUT – Update an existing user
Endpoint: PUT /api/users/update/:id  
Updates a user using their MongoDB _id.

### ✔ DELETE – Remove a user
Endpoint: DELETE /api/users/delete/:id  
Deletes a user using their MongoDB _id.

## Project Structure
project-folder/
│
├── api.js              # Main server file
├── UserModel.js        # Mongoose schema/model
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation

## Technologies Used
Node.js
Express.js
MongoDB Atlas
Mongoose
Postman (for testing)


# User-List
Simple REST API built using Node.js, Express, and MongoDB Atlas.
