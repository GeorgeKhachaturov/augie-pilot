const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank'],
        unique: [true, 'Username must be unique!'],
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: [true, 'Email must be unique!'],
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank'],
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;