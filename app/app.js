import {App, IonicApp, Platform} from 'ionic/ionic';

import {Api} from './providers/api';
import {DBManager} from './providers/dbManager';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {MovieListPage} from './pages/movieList/movieList';

@App({
    templateUrl: 'build/app.html',
    providers: [Api, DBManager]
})
class MyApp {
    constructor(app: IonicApp, platform: Platform, dbManager: DBManager) {
        
        // set up our app
        this.app = app;
        this.platform = platform;
        this.initializeApp();

        // set our app's pages
        this.pages = [{
            title: 'Hello Ionic',
            component: HelloIonicPage
        }, {
            title: 'My First List',
            component: ListPage
        }, {
            title: '電影列表',
            component: MovieListPage
        }];

        // make HelloIonicPage the root (or first) page
        this.rootPage = HelloIonicPage;

        localStorage.userName = 'Derek';

        //static db data
        setTimeout(function() {
            var user1 = {
                id: 1,
                firstName: 'Derek',
                lastName: 'Chang'
            };
            dbManager.User.add(user1);
            console.log(dbManager.User.list());
        }, 2000);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            console.log('Platform ready');

            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            //
            // For example, we might change the StatusBar color. This one below is
            // good for light backgrounds and dark text;
            if (typeof StatusBar !== 'undefined') {
                StatusBar.styleDefault();
            }
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.app.getComponent('leftMenu').close();
        // navigate to the new page if it is not the current page
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
