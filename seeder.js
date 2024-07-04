// Run "node seeder -i" to import data or "node seeder -d" to delete data

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data imported into DB...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete data from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data deleted from DB...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}