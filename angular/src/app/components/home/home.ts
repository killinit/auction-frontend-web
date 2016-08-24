import {Component} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {Product, ProductService} from '../../services/product-service';
import CarouselComponent from '../carousel/carousel';
import ProductItemComponent from '../product-item/product-item';

@Component({
    selector: 'auction-home-page',
    providers: [],
    directives: [
        CarouselComponent,
        ProductItemComponent
    ],
    styleUrls: ['app/components/home/home.css'],
    templateUrl: 'app/components/home/home.html'
})
export default class HomeComponent {
    products: Observable<Product[]>;

    constructor(private productService: ProductService) {
        this.products = this.productService.getProducts();

        this.productService.searchEvent
            .subscribe(
                params => this.products = this.productService.search(params),
                err =>  console.log("Can't get products. Error code: %s, URL: %s "),
                () => console.log('DONE')
            );
    }
}
