import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/movieInfo/movieInfo.html'
})
export class MovieInfoPage {
    constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
        this.nav = nav;

        this.movie = navParams.get('movie');
    }
}
