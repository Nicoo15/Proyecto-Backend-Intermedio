const mongoose = require('mongoose');

const dbConnect = () => {
    const db_uri = process.env.DB_URI;
    mongoose.set('strictQuery', false);

    mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to the database"))
        .catch((error) => console.error('Error connecting to the database: ', error));
};

module.exports = dbConnect;
