const co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const musicDataService = services.musicDataService;
        const music = yield musicDataService.show();
        var auth;
        for (var song in music) {
            if (music[song].user_id !== req.session.user_id) {
                auth = true;
            } else {
                auth = false;
            }
        }
        try {
            res.render('music', {
                music: music,
                auth: auth
            });
        } catch (err) {
          console.log(err);
            res.render('/error');
        }
    });
};

exports.add = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const path = (req.file.path).replace('public/', '');

        const data = {
            song: path,
            name: req.file.originalname,
            user_id: req.session.user_id
        };
        const musicDataService = services.musicDataService;
        const music = yield musicDataService.add(data);
        try {
            req.flash('alert', data.name + ' was added successfully');
            res.redirect('/music');
        } catch (err) {
            next(err);
            console.log(err);
            res.redirect('/error')
        }
    });
};


exports.delete = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const id = req.params.id;
        const musicDataService = services.musicDataService;
        const music = yield musicDataService.delete(id);
        try {
            res.redirect('/music');
        } catch (err) {
            console.err(err);
            res.redirect('/error')
        }
    });
};
