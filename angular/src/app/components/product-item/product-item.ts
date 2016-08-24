import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Product} from '../../services/product-service';
import StarsComponent from '../stars/stars';

@Component({
    selector: 'auction-product-item',
    properties: ['product'],
    styles: [require('./product-item.css')],
    template: require('./product-item.html'),
    directives: [ROUTER_DIRECTIVES, StarsComponent],
})
export default class ProductItemComponent {
    product: Product;
}
