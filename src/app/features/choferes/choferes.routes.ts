import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChoferesDashboardComponent } from './pages/dashboard/choferes-dashboard.component';

const routes: Routes = [
    { path: '', component: ChoferesDashboardComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChoferesRoutingModule { }