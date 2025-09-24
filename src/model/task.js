const mongoose = require('mongoose');

const { Schema } = mongoose;

const task = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    taskOne: {
        required: true,
        type: String
    },

    taskTwo: {
        required: true,
        type: String
    },

    taskThree: {
        required: true,
        type: String
    },

    taskFour: {
        required: true,
        type: String
    },

    taskFive: {
        required: true,
        type: String
    }

})

const UserTask = mongoose.model('UserTask', task);
module.exports = UserTask