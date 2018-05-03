require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const hbs = require('hbs');
const app = express();
const tagusCMS = require('tagus-cms');
const portNumber = process.env.PORT_NUMBER;

// override this settings to choose the view engine to be used
const partialsDir = '/SiteName/views/partials';

hbs.registerPartials(path.join(__dirname + partialsDir));
hbs.registerHelper('partial', name => {
  return name;
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('SiteName'));

tagusCMS.extend(app, {
  media: {
    path:'SiteName/img',
    dir: '/img',
    root: 'SiteName'
  },
  views: {
    path: [path.join(__dirname, 'SiteName/views'), path.join(__dirname, partialsDir)],
    engine: 'hbs'
  },
  public: 'SiteName',
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  domain: process.env.DOMAIN,
  authSecretKey: process.env.AUTHSECRETORKEY,
  email: {
    email: 'hello',
    pass: 'hello'
  }
});

app.listen(portNumber, function () {  
  console.log("listening to " + portNumber);
});

module.exports = app;
