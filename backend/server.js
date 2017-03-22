const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');

// REQUIRE IN THE MODELS:
const db = require('./models');

// REQUIRE IN THE ROUTES FILE
const routes = require('./routes');

// CORS HEADERS:
app.use(cors());

// THIS SERVES UP THE BUNDLE FILE TO BE ACCESSED BY THE FRONT END:
app.use(express.static(path.join(__dirname,'../frontend/public')));


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
// app.use(myLogger);
app.use('/api/people', routes);
// app.use(express.static(__dirname + '../views/index.html'));

// IF WHAT WE TYPE ISN'T IN THE API ROUTE - WE WANT TO SEND BACK OUR REACT APP:
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'../frontend/views/index.html'));
});

// ================================================
// STARTING THE SERVER:
app.listen(process.env.PORT || 8585, () => {
  console.log('CORS-enabled web server listening at https://localhost:8585')
});


module.exports = app;
