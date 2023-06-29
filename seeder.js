const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');
const Reviews = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false
});

const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const course = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);
const user = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(course);
        await User.create(user);
        await Reviews.create(reviews);

        console.log('Data Imported...'.green.inverse)
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();        
        await User.deleteMany();        
        await Reviews.deleteMany();        

        console.log('Data Destroyed...'.red.inverse)
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

//process.argv [0] node [1] seeder [2] -i
if(process.argv[2] === '-i') {
    importData();
} else if(process.argv[2] === '-d') {
    deleteData();
}