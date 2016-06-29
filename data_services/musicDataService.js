const QueryDataService = require('./queryDataService');

module.exports = function(connection) {
    const queryDataService = new QueryDataService(connection);
    this.show = function() {
        return queryDataService.executeQuery('select * from music');
    };

    this.add = function(data) {
      return queryDataService.executeQuery('insert into music set ?', data);
    };

    this.edit = function(id) {
      return queryDataService.executeQuery('select * from music where id = ?', id);
    };

    this.delete = function(id) {
      return queryDataService.executeQuery('delete from music where id = ?', id);
    };

    this.update = function(data, id) {
      return queryDataService.executeQuery('update music set ? where id = ?', [data, id]);
    };
};
