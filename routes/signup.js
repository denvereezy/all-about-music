const encryptonator = require('encryptonator');

exports.add = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const signupDataService = services.signupDataService;
        const data = {
            username: req.body.username
        };
        const hash = yield encryptonator.encryptPassword(req.body.password);
        data.password = hash;
        const signup = yield signupDataService.add(data);
        try {
            res.redirect('/');
        } catch (err) {
            next(err);
        };
    });
};
