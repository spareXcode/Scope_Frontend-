import { Component, Input, input } from '@angular/core';
import { SideMenueComponent } from '../side-menue/side-menue.component';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRequestStatusCardComponent } from '../order-request-status-card/order-request-status-card.component';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';
import { LocationService } from '../../services/location.service';
import { DashboardService } from '../../services/dashboard.service';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';



@Component({
  selector: 'app-spm-dashboard',
  standalone: true,
  imports: [SideMenueComponent,CalendarModule,FormsModule,OrderRequestStatusCardComponent,TopNavBarComponent,MainNavbarComponent,ReactiveFormsModule],
  templateUrl: './spm-dashboard.component.html',
  styleUrl: './spm-dashboard.component.css'
})
export class SpmDashboardComponent {


  spmDashBoardInputData: FormGroup = new FormGroup({
    locationID: new FormControl(''),
    Timeband: new FormControl('')
  })

  spmDashboardData:any = {}

  onSelectionChange(){
    this.spmDashboardData = this.spmDashBoardInputData.value
    console.log(this.spmDashboardData)
  }

  ngOnInit(): void {
    
    this.fetchLocationData()
    this.fetchNotInmasterData()
    this.fetchPendingRequestData()
    this.fetchApprovedRequestData()
    this.fetchRejectedRequestData()
    
  }

  private dealer_id = 20500
  locationData: any = []
  notInmaster: any = []
  pendingRequest: any = []
  approvedRequest: any = []
  rejectedRequest: any = []

  
  @Input() sumOfNotInMaster: number = 0
  @Input() sumOfPendingRequest: number = 0
  @Input() sumofApprovedRequest: number = 0
  @Input() sumofRejectedRequest: number = 0

  

  constructor(private locationservice: LocationService,private Dashboardservice: DashboardService){}


  fetchLocationData(){
    this.locationservice.getLocationData({dealer_id:this.dealer_id}).subscribe((res:any)=>{
      
      this.locationData  = res.data
    },(error)=>{
      console.log("Error Fetching Data  ",error )
    });
  }

  fetchNotInmasterData(){
    this.Dashboardservice.getPartNotInData({dealer_id: this.dealer_id}).subscribe((res:any)=>{
      this.notInmaster = res.data     
      this.calculateYellowLineCount()
    })
    
  }

  fetchPendingRequestData(){
    this.Dashboardservice.getPendingRequestData({dealer_id: this.dealer_id}).subscribe((res:any)=>{
      this.pendingRequest = res.data
      console.log();
      
      this.calculatePendingRequestData()
    })
  }

  fetchApprovedRequestData(){
    this.Dashboardservice.getApprovedRequestData({dealer_id: this.dealer_id}).subscribe((res:any)=>{
      this.approvedRequest = res.data
      this.calculateApprovedRequestData()
    })
  }

  fetchRejectedRequestData(){
    this.Dashboardservice.getRejectedRequestData({dealer_id:this.dealer_id}).subscribe((res:any)=>{
      this.rejectedRequest = res.data
      this.calculateRejectedRequestData()
    })
  }

  

  calculateRejectedRequestData(){

    if(Array.isArray(this.rejectedRequest)){
      this.sumofRejectedRequest = this.rejectedRequest.reduce((total:any,itemarray:any)=>{
        return total + itemarray[0].current_status_count
      },0)
    }
  }



  calculateApprovedRequestData(){

    if(Array.isArray(this.approvedRequest)){
      this.sumofApprovedRequest = this.approvedRequest.reduce((total:any,itemarray:any)=>{
        return total + itemarray[0].current_status_count
      },0)
    }
  }



  calculatePendingRequestData(){

    if(Array.isArray(this.pendingRequest)){
      this.sumOfPendingRequest = this.pendingRequest.reduce((total,itemarray)=>{
        return total + itemarray[0].current_status_count
      },0)
    }
    
  }


  calculateYellowLineCount(){
   if(Array.isArray(this.notInmaster)){
    this.sumOfNotInMaster = this.notInmaster.reduce((total,itemarray)=>{
      return total + itemarray[0].yellow_line_count
    },0)
    }
  }

  
}
