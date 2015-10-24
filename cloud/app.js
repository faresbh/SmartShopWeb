var express = require('express');
var expressLayouts = require('cloud/express-layouts');
var smartshop = require('cloud/routes/smartshop');

var app = express();

// Configure the app
app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// Setup your keys here (TODO: replace with dummy values before publicizing)
app.locals.parseApplicationId = 'z7QffxJLRKIucW67A7eGrALrp0aOU6i2nwcqC1hU';
app.locals.parseJavascriptKey = 'HRsVePrwUH5a0rTEIE1gbSRmoFtgffCOgjiWrHEP';

// Setup underscore to be available in all templates
app.locals._ = require('underscore');

// Define all the endpoints
app.get('/',smartshop.home);
app.post('/sssignin',smartshop.signin);
app.post('/sssignout',smartshop.signout);
app.get('/prod', smartshop.listprods);
app.get('/prod/new', smartshop.newProd);
app.post('/prod/save', smartshop.saveNewProd);
app.post('/prod/save/:objectId', smartshop.saveProd);
app.get('/prod/:objectId', smartshop.updateProd);
app.get('/prod/del/:objectId', smartshop.deleteProd);

app.listen(); 
