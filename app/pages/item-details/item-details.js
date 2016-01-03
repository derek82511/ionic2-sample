import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

@Page({
    templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
    constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
        this.nav = nav;

        this.isShow = true;

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        console.log(localStorage.userName);
    }

    goBack(event) {
        this.isShow = false;

        this.nav.pop();
    }
}
