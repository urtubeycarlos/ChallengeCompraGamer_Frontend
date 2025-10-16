import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChoferesDashboardComponent } from './pages/dashboard/choferes-dashboard.component';
import { ChoferDetailsComponent } from './pages/details/chofer-details.component';

const routes: Routes = [
    { path: '', component: ChoferesDashboardComponent },
    { path: ':dni', component: ChoferDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChoferesRoutingModule { }