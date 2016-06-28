const assert = require('assert');
const mysql = require('mysql');
const co = require('co');
const password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'passw0rd';
const MusicDataService = require('../data-services/musicDataService');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: password,
    port: 3306,
    database: 'travis_db'
});

connection.connect();
const musicDataService = new MusicDataService(connection)

describe('testing music app', function() {
    it('should add a song given', function(done) {
        co(function*() {
            try {
              const path = ('/public/uploads/174bdv73bdkjs92nbd7').replace('public/', '');
              const data = {
                  song: path,
                  name: 'song.mp3',
                  user_id: 1
              };
                var music = yield musicDataService.add(data);
                assert(music);
                done();
            } catch (err) {
                next(err);
            }
        })
    });
});
