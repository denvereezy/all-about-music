const encryptonator = require('encryptonator');
const co = require('co');

exports.add = function(req, res, next) {
    co(function*() {
        const services = yield req.getServices();
        const signupDataService = services.signupDataService;
        const data = {
            username: req.body.username
        };
        const password = req.body.password;
        const confirmPassword = req.body.confirm;
        if(confirmPassword !== password){
          req.flash('alert', 'passwords does not match');
          return res.redirect('/signup');
        } else {
        const hash = yield encryptonator.encryptPassword(req.body.password);
        data.password = hash;
        const signup = yield signupDataService.add(data);
      };
        try {
            res.redirect('/');
        } catch (err) {
            next(err);
        };
    });
};
