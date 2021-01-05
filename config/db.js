const mongoose = require('mongoose');
const config = require('config'); // config packaege allows for global variables that will be used throughout application
const db = config.get('mongoURI');

const connectDB = async () => { // async/await always wrapped isnide try catch block
    try {
        //mongoose.connect returns a promise
        await mongoose.connect(db, { // pass object for deprecation
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }); 
        console.log('MongoDB connected...');
    
    } catch (err) { // MongoDB unable to connect
        console.log(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;