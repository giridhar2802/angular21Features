import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', loadComponent: () => import('./features/users-list/users-list').then(m => m.UsersList) },
    { path: 'user-info', loadComponent: () => import('./features/user-info/user-info').then(m => m.UserInfo) },
];
