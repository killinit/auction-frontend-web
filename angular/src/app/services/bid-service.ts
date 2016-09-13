import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket-service';
import {Observable, Subscriber} from 'rxjs/Rx';

export class Bid {
    constructor(
        public id: number,
        public product_id: number,
        public user_id: number,
        public value: number,
        public created: Date) {
    }
}

@Injectable()
export class BidService {
    constructor(private webSocket: WebSocketService) {}

    watchProduct(productId: number): Observable<Bid> {
        let openSubscriber = Subscriber.create(
            () => this.webSocket.send({productId: productId}));

        return this.webSocket.createObservableSocket(`ws://192.168.99.101/api/auction/bids/${productId}/`, openSubscriber)
            .map(message => JSON.parse(message));
    }
}
