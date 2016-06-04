exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            return err;
            console.log(err);
        }
        connection.query('select * from music', function(err,results) {
            res.render('music', {
                results: results
            });
            if (err) {
                return err;
                console.log(err);
            };
        });
    });
};

exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
      if(err){
      console.log(err);
    };
        var path = (req.file.path).replace('public/', '');
        // console.log(req.file.path);
        var data = {
            song: path,
            name: req.file.originalname
        };
        // console.log(data);
        connection.query('insert into music set ?', data, function(err,results) {
          if(err){
            console.log(err);
          };
            res.redirect('/');
        });
    });

};

exports.delete =  function(req ,res, next) {
  req.getConnection(function(err, connection) {
    if(err) {
      console.log(err);
    };
    var id = req.params.id;
    connection.query('delete from music where id = ?', id, function(err, results) {
      if(err) {
        console.log(err);
      };
      res.redirect('/');
    })
  })
}
