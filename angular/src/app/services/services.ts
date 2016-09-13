import {BidService} from './bid-service';
import {ProductService} from './product-service';
import {WebSocketService} from './websocket-service';
import {AuthenticationService} from "./authentication-service";

export const ONLINE_AUCTION_SERVICES = [
    BidService,
    ProductService,
    WebSocketService,
    AuthenticationService
];
