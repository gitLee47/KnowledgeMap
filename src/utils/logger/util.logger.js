var winston = require('winston');

// setup default logger (no category)
winston.loggers.add('default', {
    console: {
        colorize: 'true',
        handleExceptions: true,
        json: false,
        level: 'silly',
        label: 'default',
     }
    // file: {
    //     filename: 'some/path/where/the/log/file/reside/default.log',
    //     level: 'silly',
    //     json: false,
    //     handleExceptions: true,
    // },
});
