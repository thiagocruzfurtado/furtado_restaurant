
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config(); // lib to manipulate environment variables

// express config default
app.use(bodyParser.json());
app.use(cors()); // free access to the API
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/ReservationController')(app); // import all routes 

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server started on port ${port}`));