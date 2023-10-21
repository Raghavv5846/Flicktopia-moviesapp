const mongoose = require('mongoose');
require("dotenv").config();
main().catch(err => console.log(err));

async function main() {
    console.log("mongoose has connected");
    
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@flicktopia.np3wnm1.mongodb.net/`);
}