const co = require('co');
const encryptonator = require('encryptonator');

exports.login = function(req, res, next) {
co(function*() {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const services = yield req.getServices();
        const loginDataService = services.loginDataService;
        const user = yield loginDataService.show(username);
        if (user[0] === undefined) {
            req.flash('alert', 'username or password invalid');
            return res.redirect('/');
        } else {
            const match = yield encryptonator.comparePassword(password, user[0].password);
            if (match) {
                req.session.user = user[0].username;
                req.session.user_id = user[0].id;
                res.redirect('/home');
            } else {
                req.flash('alert', 'username or password invalid');
                res.redirect('/');
            };
        }
    } catch (err) {
        next(err);
    };
});
};
