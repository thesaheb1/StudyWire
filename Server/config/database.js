const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("DataBase Connected Successfully")
    })
    .catch((error)=>{
        console.log("DataBase Connection Failed : ", error);
        console.error(error);
        process.exit(1);
    })
}