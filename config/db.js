const mongoose = require('mongoose');


const MONGO_URI = "mongodb+srv://sriramkk:MongoIsAwesome@cluster0-2e4zn.mongodb.net/storybooks?retryWrites=true&w=majority";
const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(MONGO_URI, {
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