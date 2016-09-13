import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import HomeComponent from '../home/home';
import NavbarComponent from '../navbar/navbar';
import FooterComponent from '../footer/footer';
import SearchComponent from '../search/search';
import {AuthenticationService} from '../../services/authentication-service';

import {HTTP_PROVIDERS, Http, Headers, Request, RequestMethod} from '@angular/http';
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Component({
    selector: 'auction-application',
    styles: [require('./application.css')],
    template: require('./application.html'),
    directives: [
        ROUTER_DIRECTIVES,
        NavbarComponent,
        FooterComponent,
        SearchComponent,
        HomeComponent
    ]
})
export default class ApplicationComponent {
    token: string;

    constructor(private authenticationService: AuthenticationService) {}
    ngOnInit(){
// Get the data from the server
        this.authenticationService.authenticate().subscribe(
            data => {this.token=data["token"];},
            err =>
                console.log("Can't authenticate. Error code: %s, URL: %s ", err.status, err.url),
            () => console.log('Got the token: ' + this.token)
        );
    }
}