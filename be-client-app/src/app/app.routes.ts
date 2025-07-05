import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { Home } from './components/home/home';
import { Cart } from './components/cart/cart';
import { Account } from './components/account/account';
import { Notification } from './components/notification/notification';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'cart', component: Cart},
    { path: 'account', component: Account, canActivate: []},
    { path: 'notification', component: Notification, canActivate: []},
    { path: 'login', component: Login, canActivate: []},
    { path: 'signup', component: Signup, canActivate: []}
];
