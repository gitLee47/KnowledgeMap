const mongoose  = require('mongoose');
const winston   = require('winston');

const logger = winston.loggers.get('default'); 
const CONFIG = require('../../configs/configs');

mongoose.Promise = global.Promise;
const mongo_location = 'mongodb://'+CONFIG.db_host+':'+CONFIG.db_port+'/'+CONFIG.db_name;

const connection = mongoose.connect(mongo_location, { useNewUrlParser: true });

connection
	.then(db => {
		logger.info(
			`Successfully connected to ${mongo_location} MongoDB cluster in ${
				CONFIG.app
			} mode.`,
		);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			logger.info('Attempting to re-establish database connection.');
			mongoose.connect(mongo_location);
		} else {
			logger.error(`Error while attempting to connect to database at: ${mongo_location}`);
			logger.error(err);
		}
	});

	module.exports = connection;