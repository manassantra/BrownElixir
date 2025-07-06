import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { Home } from './components/home/home';
import { Cart } from './components/cart/cart';
import { Account } from './components/account/account';
import { Notification } from './components/notification/notification';
import { authGuard } from './middleware/auth-guard';


export const routes: Routes = [
    { path: '', component: Home},
    { path: 'cart', component: Cart},
    { path: 'account', component: Account, canActivate: [authGuard]},
    { path: 'notification', component: Notification, canActivate: [authGuard]},
    { path: 'login', component: Login},
    { path: 'signup', component: Signup},
    { path: '**', redirectTo: ''}
];
