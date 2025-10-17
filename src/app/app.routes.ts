import { Routes } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'loading', pathMatch: 'full' },
    { path: 'loading', component: LoadingComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'micros', loadChildren: () => import('./features/micros/micros.routes').then(m => m.MicrosRoutingModule) },
            { path: 'choferes', loadChildren: () => import('./features/choferes/choferes.routes').then(m => m.ChoferesRoutingModule) },
            { path: 'chicos', loadChildren: () => import('./features/chicos/chicos.routes').then(m => m.ChicosRoutingModule) }
        ]
    }
];
