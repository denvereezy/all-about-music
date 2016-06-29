const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);
    this.show = function(username) {
        return queryDataService.executeQuery('select * from users where username = ?', username);
    };
};
