const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const cors = require('cors');
const bodyParser = require('body-parser');

// REQUIRE IN THE MODELS:
const db = require('./models');

// REQUIRE IN THE ROUTES FILE
const routes = require('./routes');

// CORS HEADERS:
app.use(cors());

// THIS SERVES UP THE BUNDLE FILE TO BE ACCESSED BY THE FRONT END:
app.use(express.static('public'))

// BODY PARSER MIDDLEWARE ADDS '.body' PROPERTY TO 'req'
// USED TO ACCESS DATA IN POST REQUESTS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ================================================
// MIDDLEWARE TO USE FOR ALL REQUESTS:
const myLogger = (req, res, next) => {
	console.log('Something very exciting is happening');
	next();
};


// CORS PROVIDES CONNECT/EXPRESS MIDDLEWARETO ENABLE CORS WITH VARIOUS OPTIONS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

// ================================================
// REGISTER OUR ROUTES:
// (All the routes are prefixed with /api)
app.use(myLogger);
app.use('/api/people', routes);


// IF WHAT WE TYPE ISN'T IN THE API ROUTE - WE WANT TO SEND BACK OUR REACT APP:
// app.use('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });




// ================================================
// STARTING THE SERVER:
app.listen(process.env.PORT || 8585, () => {
  console.log('CORS-enabled web server listening at https://localhost:8585')
});


module.exports = app;
