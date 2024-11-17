const User = require('../models/User.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send("please fill out all the fields");
        }
        const findUser = await User.findOne({email: email});
        if(!findUser){
            return res.status(404).send("User does not exist");
        }
        const ispasswordMatch = await bcrypt.compare(password, findUser.password);
        if(!ispasswordMatch){
            return res.status(403).send("incorrect password");
        }
        const jwtdata = {username:findUser.username, email: findUser.email, role: findUser.role};
        const token = jwt.sign(jwtdata, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
        return res.status(201).send(token);

    } catch(e){
        console.error(e);
        res.status(400).send(e.message);
    }
}

const register = async (req, res) => {
    try{
        const {username, email, password, role} = req.body;
        if(!username || !email || !password || !role){
            return res.status(400).send("Please fill out all required fields");
        }
        if(role==='admin'){
            return res.status(403).send("You are not eligible to create an admin account");
        }
        const isUser = await User.findOne({email});
        if(isUser){
            return res.status(409).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = await User.create({
            username: username,
            email: email,
            password: hashedpassword,
            role: role,
        })

        if(!newuser){
            return res.status(500).send("User not created due to internal server error");
        }
        return res.status(201).send("User created successfully");

    }catch(e){
        console.error(e);
        return res.status(500).send(e.message);
    }
}

const logout = async (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(201).send("User logged out");
    }catch (e) {
        console.error(e.message);
        return res.status(500).send("Internal server error");
    }
}

module.exports = {login, register, logout};