const assert = require('assert');
const mysql = require('mysql');
const co = require('co');
const encryptonator = require('encryptonator');
const password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';
const MusicDataService = require('../data_services/musicDataService');
const SignupDataService = require('../data_services/signupDataService');
const LoginDataService = require('../data_services/loginDataService');
const VideoDataService = require('../data_services/videoDataService');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: password,
    port: 3306,
    database: 'music'
});

connection.connect();
const musicDataService = new MusicDataService(connection);
const signupDataService = new SignupDataService(connection);
const loginDataService = new LoginDataService(connection);
const videoDataService = new VideoDataService(connection);

describe('testing user data service', function() {
    it('should add a user', function(done) {
        co(function*() {
            try {
                const password = '123';
                const data = {
                    username: 'user'

                };
                const hash = yield encryptonator.encryptPassword(password);
                data.password = hash;
                const user = yield signupDataService.add(data);
                assert(user);
                done();
            } catch (err) {
                console.error(err);
            }
        })
    });
    it('should return true if a user exists and false if not', function(done) {
        co(function*() {
            try {
                const username = 'user1';
                const user = yield loginDataService.show(username);
                if (user[0] === undefined) {
                    assert(user, 'False');
                } else {
                    assert(user, 'True');
                }
                done();
            } catch (err) {
                console.error(err);
            }
        })
    });
});

describe('testing music data service', function() {
    it('should add a song given', function(done) {
        co(function*() {
            try {
                const path = ('public/uploads/174bdv73bdkjs92nbd7').replace('public/', '');
                const data = {
                    song: path,
                    name: 'song.mp3',
                    user_id: 1
                };
                const music = yield musicDataService.add(data);
                assert(music);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
    it('should update a song name', function(done) {
        co(function*() {
            try {
                const id = 6;
                const data = {
                    name: 'song1.mp3'
                };
                const music = yield musicDataService.update(data, id);
                assert(music);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
    it('should delete a song', function(done) {
        co(function*() {
            try {
                const id = 6;
                const music = yield musicDataService.delete(id);
                assert(music);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
    it('should show all songs', function(done) {
        co(function*() {
            try {
                const music = yield musicDataService.show();
                assert(music);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
    it('should show a song for specific id', function(done) {
        co(function*() {
            try {
                const id = 7;
                const music = yield musicDataService.edit(id);
                assert(music);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
});

describe('testing video data service', function() {
    it('should add a video given', function(done) {
        co(function*() {
            try {
                const path = ('public/uploads/174bdv73bdkjs92nbd7').replace('public/', '');
                const data = {
                    song: path,
                    name: 'video.mp4',
                    user_id: 1
                };
                const video = yield videoDataService.add(data);
                assert(video);
                done();
            } catch (err) {
                console.log(err);
            };
        });
    });
    it('should update a video name', function(done) {
        co(function*() {
            try {
                const id = 6;
                const data = {
                    name: 'a_video.mp3'
                };
                const video = yield videoDataService.update(data, id);
                assert(video);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
    it('should delete a video', function(done) {
        co(function*() {
            try {
                const id = 6;
                const video = yield videoDataService.delete(id);
                assert(video);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
    it('should show all videos', function(done) {
        co(function*() {
            try {
                const video = yield videoDataService.show();
                assert(video);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
    it('should show a video for specific id', function(done) {
        co(function*() {
            try {
                const id = 7;
                const video = yield videoDataService.edit(id);
                assert(video);
                done();
            } catch (err) {
                console.error(err);
            };
        });
    });
});
