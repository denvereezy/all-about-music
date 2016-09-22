const co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const videoDataService = services.videoDataService;
        const videos = yield videoDataService.show();
        var auth;
        for (var video in videos) {
            if (videos[video].user_id !== req.session.user_id) {
                auth = true;
            } else {
                auth = false;
            }
        }
        try {
            res.render('videos', {
                videos: videos,
                auth: auth
            });
        } catch (err) {
            console.error(err);
            res.redirect('/error');
        }
    });
};

exports.add = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const path = (req.file.path).replace('public/', '');

        const data = {
            video: path,
            name: req.file.originalname,
            user_id: req.session.user_id
        };
        const videoDataService = services.videoDataService;
        const video = yield videoDataService.add(data);
        try {
            res.redirect('/videos');
        } catch (err) {
            next(err);
            res.redirect('/error')
        }
    });
};


exports.delete = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const id = req.params.id;
        const videoDataService = services.videoDataService;
        const video = yield videoDataService.delete(id);
        try {
            res.redirect('/videos');
        } catch (err) {
            console.err(err);
            res.redirect('/error')
        }
    });
};
