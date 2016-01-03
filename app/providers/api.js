import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class Api {

    constructor(http: Http) {
        this.http = http;
    }

    getMovie(onSuccess) {
        this.http.get('data/movieData.json').subscribe(res => {
            console.log(res._body);
            var data = JSON.parse(res._body);
            var header = res.headers;
            var status = res.status;
            (onSuccess || angular.noop)(data);
        });
    }

}
