import { Routes } from '@angular/router';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SpmDashboardComponent } from './components/spm-dashboard/spm-dashboard.component';

export const routes: Routes = [{
    path: 'app-top-nav-bar',
    component: TopNavBarComponent
},{
    path: 'app-admin-dashboard',
    component: AdminDashboardComponent
},
{
    path: 'app-spm-dashboard',
    component: SpmDashboardComponent
},
{
    path: '', redirectTo: 'app-spm-dashboard',

    pathMatch: 'full'
}
];
