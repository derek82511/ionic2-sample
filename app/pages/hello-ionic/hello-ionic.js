import {Page, NavController} from 'ionic/ionic';
import {Api} from '../../providers/api';
import {DBManager} from '../../providers/dbManager';

@Page({
    templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
    constructor(nav: NavController, api: Api, dbManager: DBManager) {
        this.nav = nav;
        this.api = api;
        this.dbManager = dbManager;

        var self = this;
        setInterval(function(){
            self.now = moment().format('YYYY/MM/DD HH:mm:ss');
        }, 1000);
    }

    getMovie(event) {
        var self = this;
        this.api.getMovie(function(data) {
            console.log(data);
            for (var key in data) {
                self.dbManager.Movie.add(data[key]);
            }
        });
    }

    consoleMovie(event) {
        console.log(this.dbManager.Movie.list());
    }

}
