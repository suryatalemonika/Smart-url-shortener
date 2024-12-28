const mongoose = require('mongoose');
require("dotenv").config();
const url =process.env.MONGO_URI
const dbConnect = async () => {
    try {
        await mongoose.connect(url)
        console.log(`connected to database successfully`);
    } catch (error) {
        console.log(`Error while connecting to database ${error.message}`);
    }
}

dbConnect()