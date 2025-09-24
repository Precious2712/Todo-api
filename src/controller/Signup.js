const User = require('../model/Signup');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_LIFE_TIMEOUT
    });
};

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        if (!firstName || !lastName || !password || !email) {
            return res.status(400).json({
                message: 'All fields are complusory'
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const register = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email
        })

        console.log(register);

        res.status(201).json({
            message: 'User account created',
            register
        })
    } catch (error) {
        console.log(error);
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = generateToken(user._id, user.email);

        res.status(200).json({
            success: true,
            message: "User login successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: token
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }



};

const Applicant = async (req, res) => {
    try {
        const userId = await User.findById(req.user)
        if (!userId) {
            res.status(400).json({
                message: 'No user found'
            })
        }
        res.status(201).json({
            message: 'User found in database',
            data: userId
        })
    } catch (error) {
        res.status(400).json({
            message: 'No user found',
            error: error.message
        })
    }
}

module.exports = {
    register,
    Login,
    Applicant
}