import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChicosDashboardComponent } from './pages/dashboard/chicos-dashboard.component';

const routes: Routes = [
    { path: '', component: ChicosDashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChicosRoutingModule { }