import { Component, Input, input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-request-status-card',
  standalone: true,
  imports: [HttpClientModule],
  providers:[DashboardService],
  templateUrl: './order-request-status-card.component.html',
  styleUrl: './order-request-status-card.component.css'
})
export class OrderRequestStatusCardComponent {


 @Input() text:string = ""
 dashboardData: any = []
 private dealer_id = 20115


 
}

