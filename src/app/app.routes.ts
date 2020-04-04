import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { VerificaTokenGuard } from './services/guards/verifica-token.guard';




const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerificaTokenGuard],
        // Cargamos de forma dinámica las páginas cuando se registra el usuario
        loadChildren: './pages/pages.module#PagesModule'
    },
    // { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
