import {Component, OnDestroy} from '@angular/core';
import {NgClass} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {Product, Review, ProductService} from '../../services/product-service';
import {BidService, Bid} from '../../services/bid-service';
import StarsComponent from '../stars/stars';
import {Observable} from "rxjs";
import 'rxjs/Rx';

@Component({
    selector: 'auction-product-page',
    styles: [require('./product-detail.css')],
    template: require('./product-detail.html'),
    directives: [NgClass, StarsComponent]
})
export default class ProductDetailComponent implements OnDestroy {
    product: Product;
    reviews: Review[];
    bid: Bid;
    review: Review;

    currentBid: number;
    newComment: string;
    newRating: number;

    isReviewHidden: boolean = true;
    isWatching: boolean = false;

    private subscription: Subscription;

    constructor(
        route: ActivatedRoute,
        private productService: ProductService,
        private bidService: BidService) {

        const productId = parseInt(route.snapshot.params['productId']);

        productService
            .getProductById(productId)
            .subscribe(
                product => {
                    this.product = product;
                    this.currentBid = product.price;
                },
                error => console.error(error));

        productService
            .getReviewsForProduct(productId)
            .subscribe(
                reviews => this.reviews = reviews,
                error => console.error(error));
    }

    toggleWatchProduct() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
            this.isWatching = false;
        } else {
            this.isWatching = true;
            this.subscription = this.bidService
                .watchProduct(this.product.id)
                .subscribe(
                    bid => this.currentBid = bid.value,
                    error => console.log(error));
        }
    }

    /*  routerOnDeactivate(): any {
     if (this.subscription) {
     this.subscription.unsubscribe();
     }
     }*/

    ngOnDestroy(): any {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    addReview() {
        let review = new Review(0, this.product.id, this.product.title, 1, 'luissalgadofreire@gmail.com',
            this.newRating, this.newComment, new Date());

        this.reviews = [...this.reviews, review];
        this.product.rating = this.averageRating(this.reviews);

        this.resetForm();

        this.productService
            .postReview(review)
            .subscribe(
                review => this.review = review,
                error => console.error(error));

    }

    averageRating(reviews: Review[]) {
        let sum = reviews.reduce((average, review) => average + review.rating, 0);
        return sum / reviews.length;
    }

    resetForm() {
        this.newRating = 0;
        this.newComment = null;
        this.isReviewHidden = true;
    }
}
