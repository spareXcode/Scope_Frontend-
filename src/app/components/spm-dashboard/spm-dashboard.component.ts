import { Component, Input, input } from '@angular/core';
import { SideMenueComponent } from '../side-menue/side-menue.component';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRequestStatusCardComponent } from '../order-request-status-card/order-request-status-card.component';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';
import { LocationService } from '../../services/location.service';
import { DashboardService } from '../../services/dashboard.service';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-spm-dashboard',
  standalone: true,
  imports: [SideMenueComponent,CalendarModule,FormsModule,OrderRequestStatusCardComponent,TopNavBarComponent,MainNavbarComponent,ReactiveFormsModule,CommonModule,ProgressSpinnerModule],
  templateUrl: './spm-dashboard.component.html',
  styleUrl: './spm-dashboard.component.css'
})
export class SpmDashboardComponent {


  isLoading : boolean = false


  spmDashBoardInputData: FormGroup = new FormGroup({
    locationID: new FormControl(''),
    Timeband: new FormControl(''),
    StockDate: new FormControl('Not a Date')
  })

  spmDashboardData:any = {}

  onSelectionChange(){
    this.spmDashboardData = this.spmDashBoardInputData.value
    this.fetchStockUploadData(this.spmDashBoardInputData.value.locationID)
    // this.calculateStockUploadDate()
    console.log(this.spmDashboardData)
  }

  ngOnInit(): void {
    
    this.fetchLocationData()
    // this.fetchNotInmasterData()
    // this.fetchPendingRequestData()
    // this.fetchApprovedRequestData()
    // this.fetchRejectedRequestData()
   
    
  }

  private dealer_id = 20500
  locationData: any = []
  notInmaster: any = []
  pendingRequest: any = []
  approvedRequest: any = []
  rejectedRequest: any = []
  stockUploadedDate: any = []

  
  @Input() sumOfNotInMaster: number = 0
  @Input() sumOfPendingRequest: number = 0
  @Input() sumofApprovedRequest: number = 0
  @Input() sumofRejectedRequest: number = 0
  StockUploaded_Date : string = ""

  

  constructor(private locationservice: LocationService,private Dashboardservice: DashboardService){}


  fetchLocationData(){
    this.isLoading = true
    this.locationservice.getLocationData({dealer_id:this.dealer_id}).subscribe((res:any)=>{
      // this.isLoading=false;
      //console.log("locationsData ",this.locationData)
      this.locationData  = res.data
      this.isLoading = false

    },(error)=>{
      // this.isLoading=true;
      console.log("Error Fetching Data  ",error )
    });
    
  }

  // fetchNotInmasterData(){
  //   this.isLoading = true
  //   this.Dashboardservice.getPartNotInData({dealer_id: this.dealer_id}).subscribe((res:any)=>{
  //     this.notInmaster = res.data     
  //     this.calculateYellowLineCount()
  //     this.isLoading = false
  //   })
    
  // }

  // fetchPendingRequestData(){
  //   this.isLoading = true
  //   this.Dashboardservice.getPendingRequestData({dealer_id: this.dealer_id}).subscribe((res:any)=>{
  //     this.pendingRequest = res.data
  //     console.log();
      
  //     this.calculatePendingRequestData()
  //     this.isLoading = false
  //   })
  // }

  // fetchApprovedRequestData(){
  //   this.isLoading = true
  //   this.Dashboardservice.getApprovedRequestData({dealer_id: this.dealer_id}).subscribe((res:any)=>{
  //     this.approvedRequest = res.data
  //     this.calculateApprovedRequestData()
  //     this.isLoading = false
  //   })
  // }

  // fetchRejectedRequestData(){
  //   this.isLoading = true
  //   this.Dashboardservice.getRejectedRequestData({dealer_id:this.dealer_id}).subscribe((res:any)=>{
  //     this.rejectedRequest = res.data
  //     this.calculateRejectedRequestData()
  //     this.isLoading = false
  //   })
  // }

   fetchStockUploadData(locationId:any) {
     this.isLoading = true
     this.Dashboardservice.getStockUpoadDatedata({ location_id: locationId}).subscribe((res: any) => {
       this.stockUploadedDate = res.data;
  
       // Check if the data is valid and then call calculateStockUploadDate
       if (Array.isArray(this.stockUploadedDate) && this.stockUploadedDate.length > 0) {
         this.calculateStockUploadDate();
         this.isLoading = false
       } else {
         console.log("No valid stock upload data available.");
         this.isLoading = false
       }
    });
  }
  
   calculateStockUploadDate() {
     this.StockUploaded_Date = this.stockUploadedDate[0].StockDate;
  
     // Safely split the date part
     if (this.StockUploaded_Date) {
       this.spmDashBoardInputData.value.StockDate = this.StockUploaded_Date.split('T')[0];
       console.log("Extracted Date: ",this.spmDashBoardInputData.value.StockDate );
     } else {
       console.log("StockUploaded_Date is undefined or invalid.");
     }
   }

  // calculateRejectedRequestData(){

  //   if(Array.isArray(this.rejectedRequest)){
  //     this.sumofRejectedRequest = this.rejectedRequest.reduce((total:any,itemarray:any)=>{
  //       return total + itemarray[0].current_status_count
  //     },0)
  //     console.log("sum of rejected request ", this.sumofRejectedRequest);
      
  //   }
  // }



  // calculateApprovedRequestData(){

  //   if(Array.isArray(this.approvedRequest)){
  //     this.sumofApprovedRequest = this.approvedRequest.reduce((total:any,itemarray:any)=>{
  //       return total + itemarray[0].current_status_count
  //     },0)
  //     console.log("sum ofapproved request ",this.sumofApprovedRequest );
      
  //   }
  // }



  // calculatePendingRequestData(){

  //   if(Array.isArray(this.pendingRequest)){
  //     this.sumOfPendingRequest = this.pendingRequest.reduce((total,itemarray)=>{
  //       return total + itemarray[0].current_status_count
  //     },0)
  //     console.log("sumof pending reuqest ",this.sumOfPendingRequest);
      
  //   }
    
  // }


  // calculateYellowLineCount(){
  //  if(Array.isArray(this.notInmaster)){
  //   this.sumOfNotInMaster = this.notInmaster.reduce((total,itemarray)=>{
  //     return total + itemarray[0].yellow_line_count
  //   },0)
  //   console.log("sum of yellow line", this.sumOfNotInMaster);
    
  //   }
  // }

  
}
