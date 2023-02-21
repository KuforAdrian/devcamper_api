const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({path: './config/config.env'});

//Load models
const Bootcamps = require('./models/Bootcamps');
const Course = require('./models/Course');


//Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI,{

    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
    
});

//Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);


//Import into DB
const importData = async () => {
    try{
        await Bootcamps.create(bootcamps);
        await Course.create(courses);
        console.log('Data imported...'.green.inverse);
        process.exit();
    } catch(err){
        console.error(err);
    } 
}


//Delete data
const deleteData = async () => {
    try{
        await Bootcamps.deleteMany();
        await Course.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch(err){
        console.error(err);
    }
}


//node seeder -i/on command line
if(process.argv[2] === '-i'){
    importData();
    //node seeder -d/on command line
} else if(process.argv[2] === '-d'){
    deleteData();
}
