const express = require('express');
const router = express.Router();

const {
    createTask,
    getAllTask,
    deleteUserTask,
    updateUserTask,
    getUserTasks
} = require('../controller/task');

router.post('/createtasks', createTask);

router.get('/getAlltasks', getAllTask);

router.get('/getUserTasks/:id', getUserTasks);

router.put('/updatetasks/:id', updateUserTask);

router.delete('/deletetasks/:id', deleteUserTask);

module.exports = router;