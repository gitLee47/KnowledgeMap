const topicsController = require('../../controllers/topics.controller');
const CONFIG = require('../../configs/configs');

exports.routesConfig = function (app) {
    app.get(`/${CONFIG.version}/topics/hc`, [
        topicsController.hc
    ]);

    app.get(`/${CONFIG.version}/topics/:topic`, [
        topicsController.getTopicCountByTopicName
    ]);
}