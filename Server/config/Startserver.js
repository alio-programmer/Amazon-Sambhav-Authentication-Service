const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authrouter = require("../routes/User.routes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const startserver = async () =>{
    PORT = process.env.PORT || 5081
    try{
        await app.listen(PORT, ()=>{
            console.log(`server started on http://localhost:${PORT}`);
        })
    } catch(e){
        console.error(e);
        process.exit(1);
    }
}
app.use("/auth", authrouter)

app.use("/", (req, res) =>{
    res.status(200).send("Welcome to the server");
})
module.exports = startserver;