const uuid = require('uuid'),
    co = require('co');

exports.reset = function(req, res, next) {
    co(function*() {
            const data = {
                email: req.body.email,
                token: uuid.v4()
            };
            const services = yield req.getServices();
            const resetDataService = services.resetDataService;
            const reserPassword = yield resetDataService.send(data);

        }
        try {
            req.flash('msg', 'Email send to ' + data.emails);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.render('/error');
        };
    });
};
