import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';

import {ItemDetailsPage} from '../item-details/item-details';

@Page({
    templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
    constructor(app: IonicApp, nav: NavController, navParams: NavParams) {
        this.nav = nav;

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.icons = ['ion-ios-flask', 'ion-ios-wifi', 'ion-ios-beer', 'ion-ios-football', 'ion-ios-basketball', 'ion-ios-paper-plane',
            'ion-ios-american-football', 'ion-ios-boat', 'ion-ios-bluetooth', 'ion-ios-build'
        ];

        this.items = [];
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                //icon: this.icons[Math.floor(Math.random() * this.icons.length)]
                icon: this.icons[i - 1]
            });
        }
    }

    itemTapped(event, item) {

        console.log('You selected:', item.title);
        console.log(item);

        this.nav.push(ItemDetailsPage, {
            item: item
        });
    }
}
