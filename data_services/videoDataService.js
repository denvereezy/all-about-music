const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);

    this.add = function(data) {
        return queryDataService.executeQuery('insert into videos set ?', data);
    };

    this.show = function() {
        return queryDataService.executeQuery('select * from videos');
    };

    this.edit = function(id) {
        return queryDataService.executeQuery('select * from videos where id = ?', id);
    };

    this.delete = function(id) {
        return queryDataService.executeQuery('delete from videos where id = ?', id);
    };

    this.update = function(data, id) {
        return queryDataService.executeQuery('update videos set ? where id = ?', [data, id]);
    };
};
