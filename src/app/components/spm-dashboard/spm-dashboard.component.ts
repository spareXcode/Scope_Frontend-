import { Component } from '@angular/core';
import { SideMenueComponent } from '../side-menue/side-menue.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { OrderRequestStatusCardComponent } from '../order-request-status-card/order-request-status-card.component';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';


@Component({
  selector: 'app-spm-dashboard',
  standalone: true,
  imports: [SideMenueComponent,CalendarModule,FormsModule,OrderRequestStatusCardComponent,TopNavBarComponent],
  templateUrl: './spm-dashboard.component.html',
  styleUrl: './spm-dashboard.component.css'
})
export class SpmDashboardComponent {

  
}
