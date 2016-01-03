import {IonicApp, Page, NavController} from 'ionic/ionic';

import {DBManager} from '../../providers/dbManager';
import {MovieInfoPage} from '../movieInfo/movieInfo';

@Page({
    templateUrl: 'build/pages/movieList/movieList.html'
})
export class MovieListPage {
    constructor(app: IonicApp, nav: NavController, dbManager: DBManager) {
        this.nav = nav;
        this.dbManager = dbManager;

        this.movies = this.dbManager.Movie.list();
        this.moviesKeys = Object.keys(this.movies);
    }

    movieInfo(event, movieKey){
        this.nav.push(MovieInfoPage, {
            movie: this.movies[movieKey]
        });
    }
}
