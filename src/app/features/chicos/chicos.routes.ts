import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChicosDashboardComponent } from './pages/dashboard/chicos-dashboard.component';
import { ChicoDetailsComponent } from './pages/details/chico-details.component';

const routes: Routes = [
    { path: '', component: ChicosDashboardComponent },
    { path: ':dni', component: ChicoDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChicosRoutingModule { }