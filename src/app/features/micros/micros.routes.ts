import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroDetailsComponent } from './pages/details/micro-details.component';
import { MicrosDashboardComponent } from './pages/dashboard/micros-dashboard.component';

const routes: Routes = [
    { path: '', component: MicrosDashboardComponent },
    { path: ':patente', component: MicroDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MicrosRoutingModule { }