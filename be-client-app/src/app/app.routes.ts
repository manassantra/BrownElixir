import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { Home } from './components/home/home';
import { Cart } from './components/cart/cart';
import { Account } from './components/account/account';
import { Notification } from './components/notification/notification';
import { AuthGuard } from './middleware/auth-guard';
import { ProductList } from './components/product-list/product-list';
import { Product } from './components/product/product';
import { Address } from './components/address/address';


export const routes: Routes = [
    { path: '', component: Home},
    { path: 'cart', component: Cart, canActivate: [AuthGuard]},
    { path: 'product-list/:data', component: ProductList },
    { path: 'product/:id', component: Product },
    { path: 'account', component: Account, canActivate: [AuthGuard]},
    { path: 'notification', component: Notification, canActivate: [AuthGuard]},
    { path: 'address-list', component: Address, canActivate: [AuthGuard]},
    { path: 'login', component: Login, canActivate: [AuthGuard]},
    { path: 'signup', component: Signup},
    { path: '**', redirectTo: ''}
];
