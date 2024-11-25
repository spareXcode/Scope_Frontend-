import { Component } from '@angular/core';
import { SideMenueComponent } from '../side-menue/side-menue.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { OrderRequestStatusCardComponent } from '../order-request-status-card/order-request-status-card.component';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';
import { LocationService } from '../../services/location.service';
import { DashboardService } from '../../services/dashboard.service';



@Component({
  selector: 'app-spm-dashboard',
  standalone: true,
  imports: [SideMenueComponent,CalendarModule,FormsModule,OrderRequestStatusCardComponent,TopNavBarComponent],
  templateUrl: './spm-dashboard.component.html',
  styleUrl: './spm-dashboard.component.css'
})
export class SpmDashboardComponent {

  ngOnInit(): void {
    console.log("SPM ngOninit called ")
    this.fetchLocationData()
    this.fetchNotInmasterData()
    
  }

  private dealer_id = 20500
  locationData: any = []
  notInmaster: any = []
  

  constructor(private locationservice: LocationService,private Dashboardservice: DashboardService){}


  fetchLocationData(){
    this.locationservice.getLocationData({dealer_id:this.dealer_id}).subscribe((res:any)=>{
      console.log("res ",res,this.dealer_id);
      
      this.locationData  = res.data
    },(error)=>{
      console.log("Error Fetching Data  ",error )
    });
  }

  fetchNotInmasterData(){
    this.Dashboardservice.getDashboardData({dealer_id: this.dealer_id}).subscribe((res:any)=>{
      this.notInmaster = res.data
      console.log(res.data)
    })
  }

  
}
