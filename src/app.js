const express 		= require('express');
const bodyParser 	= require('body-parser');
const cors          = require('cors');
const morgan 	    = require('morgan');
const fs            = require('fs');
const path          = require('path');
const winston       = require('winston');

const app = express();

const CONFIG = require('./configs/configs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(cors());

const logger = winston.loggers.get('default'); 

fs.readdirSync(path.join(__dirname, `routes/${CONFIG.version}`)).map(file => {
    var route = require(`./routes/v1/` + file);
    route.routesConfig(app);
});

// app.use('/', function(req, res){
// 	res.statusCode = 200;//send the appropriate status code
// 	res.json({status:"success", message:"Mongo API", data:{}})
// });

//catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(CONFIG.port, err => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}

	//require('./utils/db').default;

	logger.info(
		`API ${CONFIG.version} is now running on port ${CONFIG.port} in ${CONFIG.app} mode`
	);
});

module.exports = app;