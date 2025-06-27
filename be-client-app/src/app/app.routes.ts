import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';

export const routes: Routes = [
    { path: '', component: Dashboard},
    { path: 'login', component: Login},
    { path: 'signup', component: Signup}
];
