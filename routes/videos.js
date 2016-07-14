const co = require('co');

exports.show = function(req, res, next) {
  co(function* (){
         const services = yield req.getServices();
         const videoDataService = services.videoDataService;
         const videos = yield videoDataService.show();
         try{
                 res.render('videos', {videos : videos});
         }
         catch(err){
             res.render('videos', {error : err});
         }
     });
};

exports.add = function(req, res, next) {
  co(function* (){
         const services = yield req.getServices();
         const path = (req.file.path).replace('public/', '');

         const data = {
             video: path,
             name: req.file.originalname,
             user_id: req.session.user_id
         };
         const videoDataService = services.videoDataService;
         const video = yield videoDataService.add(data);
         try{
                 res.redirect('/music');
         }
         catch(err){
             next(err);
             res.redirect('/')
         }
     });
};


exports.delete =  function(req ,res, next) {
  co(function* (){
         const services = yield req.getServices();
         const id = req.params.id;
         const musicDataService = services.musicDataService;
         const music = yield musicDataService.delete(id);
         try{
                 res.redirect('/music');
         }
         catch(err){
             console.err(err);
             res.redirect('/')
         }
     });
};

exports.edit = function(req, res, next) {
  console.log(music);

};
