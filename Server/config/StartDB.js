const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const startDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("MongoDB Atlas Connected");
        });
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}

module.exports = startDB;