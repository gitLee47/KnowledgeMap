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

// app.use('/', function(req, res){
// 	res.statusCode = 200;//send the appropriate status code
// 	res.json({status:"success", message:"Mongo API", data:{}})
// });

app.listen(CONFIG.port, err => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}

	require('./utils/db').default;

	fs.readdirSync(path.join(__dirname, `routes/${CONFIG.version}`)).map(file => {
        var route = require(`./routes/v1/` + file);
        route.routesConfig(app);
	});

	logger.info(
		`API ${CONFIG.version} is now running on port ${CONFIG.port} in ${CONFIG.app} mode`
	);
});

module.exports = app;