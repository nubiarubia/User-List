// ================================== //
// ===== User List Model Setup ===== //
//=================================== //

const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// This schema defines the structure of the User List documents in the MongoDB collection. 
const userSchema = new Schema({ 
    id: { type: Number, required: true, unique: true }, 
    email: { type: String, required: true }, 
    username: { type: String } 
});

module.exports = mongoose.model('User', userSchema);