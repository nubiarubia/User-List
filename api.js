'use strict'; 

// ================================== //
// ======= UserList API ============= //
//=================================== //
 
// Importing packages 
const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose');
const User = require('./UserModel'); 
 
// Initialize Express app 
const app = express(); 
// Define the port for the server to listen on 
const port = process.env.PORT || 3000; // You can change this port 
 
// Middleware setup 
// Enable CORS (Cross-Origin Resource Sharing) for all routes 
app.use(cors()); 
// Enable Express to parse JSON formatted request bodies 
app.use(express.json()); 

// ================================== //
// ===== Connection to MongoBD ====== //
//=================================== //

mongoose.connect('mongodb+srv://marthaUser:UnsafePassword123@cluster0.wpcxmfw.mongodb.net/UserList?appName=Cluster0') 
.then(() => { 
    console.log('Connected to MongoDB'); 
    // Start the Express server only after successfully connecting to MongoDB 
    app.listen(port, () => { 
        console.log('User List API Server is running on port ' + port); 
    }); 
}) 
.catch((error) => { 
    // Log any errors that occur during the MongoDB connection 
    console.error('Error connecting to MongoDB:', error); 
}); 

// ================================== //
// === User List API Routes Setup === //
//=================================== //

// Create an Express Router instance 
const router = express.Router(); 
 
// Mount the router middleware at the '/api/users' path. All routes defined on this router will be prefixed with '/api/users'. 
app.use('/api/users', router);

// =========================================== //
// ============== GET ALL USERS ============== //
// =========================================== //

// Handles GET requests to '/api/users/'. 
router.route("/") 
    .get((req, res) => { 
        console.log("Fetching all users..."); // Log the request for debugging purposes. 
        // Find all user documents in the 'User List' collection. 
        User.find() 
            .then((users) => res.json(users)) // If successful, return users as JSON. 
            .catch((err) => res.status(400).json("Error: " + err)); // If error, return 400 status with error message. 
    }); 

// =========================================== //
// =========== GET A SPECIFIC USER =========== //
// =========================================== //

// Handles GET requests to '/api/users/:id'. 
router.route("/:id") 
    .get((req, res) => { 
        // Find a user document by its ID from the request parameters. 
        User.findById(req.params.id) 
            .then((users) => res.json(users)) // If successful, return users as JSON. 
            .catch((err) => res.status(400).json("Error: " + err)); // If error, return 400 status with error message. 
    }); 

// =========================================== //
// ============== ADD NEW USER =============== //
// =========================================== //

// Route to add a new user to the database. 
// Handles POST requests to '/api/users/add'. 
router.route("/add") 
    .post((req, res) => { 
        // Extract attributes from the request body. 
        const id = req.body.id; 
        const email = req.body.email; 
        const username = req.body.username; 
 
        // Create a new user object using the extracted data. 
        const newUser = new User({ 
            id, 
            email, 
            username 
        }); 
 
        // Save the new user document to the database. 
        newUser 
            .save() 
            .then(() => res.json("User added!")) // If successful, return success message. 
            .catch((err) => res.status(400).json("Error: " + err)); // If error, return 400 status with error message. 
    }); 

// =========================================== //
// ========= UPDATE AN EXISTING USER ========= //
// =========================================== //

// Route to update an existing user by their ID. 
// Handles PUT requests to '/api/users/update/:id'. 
router.route("/update/:id") 
    .put((req, res) => { 
        // Find user by ID. 
        User.findById(req.params.id) 
            .then((users) => { 
                // Update user's attributes with data from the request body. 
                users.id = req.body.id; 
                users.email = req.body.email; 
                users.username = req.body.username; 
 
                // Save the updated user document. 
                users 
                    .save() 
                    .then(() => res.json("User updated!")) // If successful, return success message. 
                    .catch((err) => res.status(400).json("Error: " + err)); // If error, return 400 status with error message. 
            }) 
            .catch((err) => res.status(400).json("Error: " + err)); // If user not found or other error, return 400. 
    }); 

// =========================================== //
// ============== DELETE A USER ============== //
// =========================================== //

// Route to delete a user by their ID. 
// Handles DELETE requests to '/api/users/delete/:id'. 
router.route("/delete/:id") 
    .delete((req, res) => { 
        // Find and delete the user document by ID. 
        User.findByIdAndDelete(req.params.id) 
            .then(() => res.json("User deleted.")) // If successful, return success message. 
            .catch((err) => res.status(400).json("Error: " + err)); // If error, return 400 status with error message. 
    }); 