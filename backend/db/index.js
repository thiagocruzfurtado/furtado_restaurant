const mongoose = require('mongoose');


// this function connect to mongodb, and here it uses the environment variable with the mongo's credentials
mongoose.connect(process.env.MONGODB_URL, 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
  console.log('Database Mongo Connected');
}).catch((err) => {
    console.log(err)
  console.log('Database Mongo Error');
});

// config promise
mongoose.Promise = global.Promise;

module.exports = mongoose;