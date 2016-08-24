import {EventEmitter, Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

export class Category {
    constructor(
        public id: number,
        public title: string) {
    }
}

export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public num_reviews: number,
        public rating: number,
        public description: string,
        public categories: Array<Category>) {
    }
}

export class Review {
    constructor(
        public id: number,
        public product_id: number,
        public product: string,
        public user_id: number,
        public user: string,
        public rating: number,
        public comment: string,
        public created: Date) {
    }
}

export interface ProductSearchParams {
    title: string;
    price: number;
    category: number;
}

@Injectable()
export class ProductService {
    searchEvent: EventEmitter = new EventEmitter();
    headers: Headers = new Headers();

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    search(params: ProductSearchParams): Observable<Product[]> {

        return this.http
            .get('http://192.168.99.101/api/products/', {headers: this.headers, search: encodeParams(params)})
            .map(response => response.json());
    }

    getProducts(): Observable<Product[]> {
        return this.http.
            get('http://192.168.99.101/api/products/', {headers: this.headers})
            .map(response => response.json());
    }

    getProductById(productId: number): Observable<Product> {
        return this.http.
            get(`http://192.168.99.101/api/products/${productId}/`, {headers: this.headers})
            .map(response => response.json());
    }

    getReviewsForProduct(productId: number): Observable<Review[]> {
        return this.http
            .get(`http://192.168.99.101/api/products/${productId}/reviews`, {headers: this.headers})
            .map(response => response.json())
            .map(reviews => reviews.map(
                (r: any) => new Review(r.id, r.product_id, r.product, r.user_id, r.user, r.rating, r.comment, r.created)));
    }

    getAllCategories(): Observable<Category[]> {
        return this.http
            .get(`http://192.168.99.101/api/categories/`, {headers: this.headers})
            .map(response => response.json())
    }

    postReview(review: Review): Observable<Review> {
        return this.http
            .post(`http://192.168.99.101/api/reviews/`, JSON.stringify(review), {headers: this.headers})
            .map(response => response.json())
    }

}

/**
 * Encodes the object into a valid query string.
 */
function encodeParams(params: any): URLSearchParams {
    return Object.keys(params)
        .filter(key => params[key])
        .reduce((accum: URLSearchParams, key: string) => {
            accum.append(key, params[key]);
            return accum;
        }, new URLSearchParams());
}
