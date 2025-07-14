import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { UnauthenticadedGuard } from './core/guards/unauthenticated.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '', loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
        ],
        canActivate: [UnauthenticadedGuard],
    },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', redirectTo: 'enquetes', pathMatch: 'full' },
            { path: 'enquetes', loadChildren: () => import('./features/enquete/enquete.routes').then(m => m.ENQUETE_ROUTES) },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '/login'
    },
];
