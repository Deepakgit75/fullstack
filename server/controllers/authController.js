const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  User  = require('../models/User');

const signup = async (req, res) => {
    // Validate input
    try {
		// Destructure fields from the request body
		const {
			username,
			email,
			password,
			confirmPassword,

		} = req.body;
		// Check if All Details are there or not
		if (
			!username ||
			!email ||
			!password ||
			!confirmPassword
		)
        {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

        // Hash password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password"
            });
        }

        // Create new user
        const user = await User.create({ username, email, password: hashedPassword });
        // await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('token', token);

        // Save token to user document in database
        user.password = undefined;
        user.token = token;
        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
        });


        // return res.status(200).json({
		// 	success: true,
		// 	user,
        //  token,
		// 	message: "User registered successfully",
		// });
    } catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

const login = async (req, res) => {
    // Implement login logic
};

module.exports = { signup };
