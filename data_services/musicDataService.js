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

    this.delete = function(id, user_id) {
      return queryDataService.executeQuery('delete from music where id = ? and user_id = ?', [id, user_id]);
    };

    this.update = function(id, user_id) {
      return queryDataService.executeQuery('update music set where id = ? and user id = ?', [id, user_id]);
    };
};
