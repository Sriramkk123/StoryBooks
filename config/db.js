const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useUnifiedTopology: true
        })
        console.log(`Mongo connected: ${conn.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}

module.exports = connectDB;