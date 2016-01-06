import {Injectable} from 'angular2/core';

@Injectable()
export class DBManager {

    constructor() {
        var self = this;

        var db = new Dexie('Practice_indexedDB');

        db.version(1)
        .stores({
            user: 'id',
            movie: 'id'
        });

        db.open().then(function(){
            //alert('Dexie success');

            //User 
            var users = {};
            db.user.toCollection().each(function(user) {
                users[user.id] = user;
            });
            self.User = {
                add: function(user){
                    if(!users[user.id]){
                        users[user.id] = user;
                        db.user.add(user).then(function (item) {
                            // item stored
                        });
                    }
                },
                list: function(){
                    return users;
                }
            };

            //Movie
            var movies = {};
            db.movie.toCollection().each(function(movie) {
                movies[movie.id] = movie;
            });
            self.Movie = {
                add: function(movie){
                    if(!movies[movie.id]){
                        movies[movie.id] = movie;
                        db.movie.add(movie).then(function (item) {
                            // item stored
                        });
                    }
                },
                list: function(){
                    return movies;
                }
            };
        })
        .catch(function(error){
            //alert('Uh oh : ' + error);
        });

    }

}