import {Injectable} from 'angular2/core';

@Injectable()
export class DBManager {

    constructor() {
        var self = this;

        db.open({
            server: 'Practice_indexedDB',
            version: 1,
            schema: {
                user: {
                    key: {keyPath: 'id'},
                    // Optionally add indexes
                    indexes: {
                        firstName: {},
                        lastName: {}
                    }
                },
                movie: {
                    key: {keyPath: 'id'}
                }
            }
        }).then(function (s) {
            var server = s;

            /* User */
            var users = {};
            server.user.query()
                .all()
                .execute()
                .then(function (results) {
                    for(var key in results){
                        users[results[key].id] = results[key];
                    }
                });
            self.User = {
                add: function(user){
                    if(!users[user.id]){
                        users[user.id] = user;
                        server.user.add(user).then(function (item) {
                            // item stored
                        });
                    }
                },
                list: function(){
                    return users;
                }
            };

            /* Movie */
            var movies = {};
            server.movie.query()
                .all()
                .execute()
                .then(function (results) {
                    for(var key in results){
                        movies[results[key].id] = results[key];
                    }
                });
            self.Movie = {
                add: function(movie){
                    if(!movies[movie.id]){
                        movies[movie.id] = movie;
                        server.movie.add(movie).then(function (item) {
                            // item stored
                        });
                    }
                },
                list: function(){
                    return movies;
                }
            };
            
        });
    }

}