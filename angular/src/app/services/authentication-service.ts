import {EventEmitter, Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    headers: Headers = new Headers();
    source: Observable;

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    authenticate(): Observable<Response> {
        var data = JSON.stringify({email: "admin@email.com", password: "password"});

        return this.http
            .post('http://192.168.99.101/api/auth/login/',
                data,
                {headers: this.headers})
            .map(res => res.json());
    }
}