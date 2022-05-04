require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to Database.'))
    .catch((err) => console.log('Could not connect to Database:', err));
    

module.exports = mongoose;