exports.checkUser = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/");
    };
};

exports.login = function(req, res, next) {
    res.render('login', {
        layout: false
    });
};

exports.home = function(req, res, next) {
  var user = req.session.user;
    res.render('index', {
      message: 'Welcome back ' + user + '!'
    });
};

exports.error = function(req, res, next) {
    res.render('404', {
      layout: false
    });
};

exports.signup = function(req, res, next) {
    res.render('signup', {
        layout: false
    });
};

exports.addSong = function(req, res, next) {
    res.render('addSong');
};

exports.logout = function(req, res, next) {
    delete req.session.user
    res.redirect("/");
};

exports.addVideo = function(req, res, next) {
    res.render('addVideo');
};

exports.select = function(req, res, next) {
    res.render('showAdd');
};
