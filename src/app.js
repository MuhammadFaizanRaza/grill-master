const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const logger = require('morgan');
//Loads the handlebars module
const handlebars = require('express-handlebars');

/* Require configuration */
const { ENV } = require('./config');

/* Get required libraries */
const {
  Factory: { ErrorFactory },
  Mappings: {
    Errors: { RouteErrors },
  },
} = require('./libraries');

/* Require all routes */
const routes = require('./modules/grills/grill-master.routes');

/* Create Express Application */
const app = express();

/**
 * Load all middlewares
 */

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine(
  'hbs',
  handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: [__dirname + '/views/'],
  })
);

app.set('views', __dirname + '/views/');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compress());


// configure logger if in development
if (ENV === 'development') {
  app.use(logger('dev'));
}

/**
 * Mount all routes on path /api
 */
app.use('/', routes);

/**
 * If requested route does not exist
 */
app.use((req, res, next) => {
  res.send('not found');
});

/**
 * GLOBAL ERROR HANDLER
 * this is a global error handler to catch all errors and pass it to next middleware
 * to pass a custom error to this handler from any route call next(error)
 */
app.use((err, req, res, next) => {
  let finalError = err;

  /* Unexpected Error */
  if (finalError.name !== 'APIError') {
    // log this error since this is an unexpected error that we didn't created ourself
    console.error('SYSTEM ERROR: ', finalError);
    finalError = ErrorFactory.getError();
  }
  next(finalError);
});

/**
 * Export express app
 */
module.exports = app;
