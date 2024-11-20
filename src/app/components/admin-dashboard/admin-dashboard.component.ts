import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';
import { OrderRequestStatusCardComponent } from '../order-request-status-card/order-request-status-card.component';
import { SideMenueComponent } from '../side-menue/side-menue.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [TopNavBarComponent,OrderRequestStatusCardComponent,SideMenueComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
