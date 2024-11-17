const authrouter = require('express').Router();
const {login, register, logout} = require("../controller/Authentication.controller")

authrouter.post("/login", login);
authrouter.post("/register", register);
authrouter.post("/logout", logout);

module.exports = authrouter;