const startserver = require("./config/Startserver")
const startDB = require("./config/StartDB")

try{
    console.log("Starting server...")
    startserver();
    console.log("Connecting to database...")
    startDB();
} catch(e){
    console.error(e);
    process.exit(1);
}
