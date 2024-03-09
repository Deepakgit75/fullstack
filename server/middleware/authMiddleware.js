const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");
const { cookies } = require('express-validator');

const authenticateToken = async (req, res, next) => {
   try{
        console.log("BEFORE ToKEN EXTRACTION");
        const token = req.cookies.token 
        || req.body.token 
        || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");

        if (!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing token not found",
            })

        }

        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid decoding issue',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
};

module.exports = { authenticateToken };
