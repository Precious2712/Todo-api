require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const signup = require('./src/route/Signup');
const task = require('./src/route/task');

app.use('/api/v1/', signup);
app.use('/api/v2/', task);

const port = 4000;

function start() {
    app.listen(port, () => {
        const mongooseConnect = mongoose.connect(process.env.MONGO_URI);
        if (mongooseConnect) {
            console.log(`Server is running on port ${port}`)
        }
        else {
            console.log('Failed to connect to mongoose database');
        }
    });
}

start();