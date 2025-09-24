const Task = require('../model/task');
const User = require('../model/Signup');

const createTask = async (req, res) => {
    const { userId, taskOne, taskTwo, taskThree, taskFour, taskFive } = req.body;

    try {
        const user = await User.findById(userId);
        console.log(user);

        if (!user) {
            return res.status(400).json({ message: 'No user found with this ID' });
        }

        if (!taskOne || !taskTwo || !taskThree || !taskFour || !taskFive || !userId) {
            return res.status(400).json({ message: 'All fields are compulsory' });
        }

        const newTask = await Task.create({
            userId: user._id,
            taskOne: taskOne,
            taskTwo: taskTwo,
            taskThree: taskThree,
            taskFour: taskFour,
            taskFive: taskFive
        });

        console.log(newTask);

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating task',
            error: error.message
        });
    }
};


const getUserTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const allData = await Task.find({ userId: id });
        if (!allData) {
            return res.status(400).json({ message: 'No collection found' });
        }
        res.status(201).json({
            message: 'User task fetch',
            allData
        })
    } catch (error) {
        console.log(error);

        res.status(501).json({
            message: 'An error has occur',
            err: `${error}`
        })
    }

}

const getAllTask = async (req, res) => {
    const userData = await Task.find();

    if (!userData) {
        return res.status(400).json({
            message: 'No task found',
        })
    }

    res.json({
        message: 'All tasks',
        userData: userData
    })
}

const deleteUserTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            task: deletedTask
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting task',
            error: error.message
        });
    }
};

const updateUserTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskOne, taskTwo, taskThree, taskFour, taskFive } = req.body;

        const update = {};
        if (taskOne) update.taskOne = taskOne;
        if (taskTwo) update.taskTwo = taskTwo;
        if (taskThree) update.taskThree = taskThree;
        if (taskFour) update.taskFour = taskFour;
        if (taskFive) update.taskFive = taskFive;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating task',
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getAllTask,
    deleteUserTask,
    updateUserTask,
    getUserTasks
}