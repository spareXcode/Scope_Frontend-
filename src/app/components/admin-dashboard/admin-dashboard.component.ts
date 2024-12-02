import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';
import { OrderRequestStatusCardComponent } from '../order-request-status-card/order-request-status-card.component';
import { SideMenueComponent } from '../side-menue/side-menue.component';
import { AdmindashboardService } from '../../services/admindashboard.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    TopNavBarComponent,
    OrderRequestStatusCardComponent,
    SideMenueComponent,
    ReactiveFormsModule,
    CommonModule,
    ProgressSpinnerModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private adminDashBoardService: AdmindashboardService) {}

  @Input() sumOfNotInMaster: number = 0
  @Input() sumOfPendingRequest: number = 0
  @Input() sumofApprovedRequest: number = 0
  @Input() sumofRejectedRequest: number = 0

  AdminDashboardInputData: FormGroup = new FormGroup({
    BrandID: new FormControl(''),
    DealerID: new FormControl(''),
    LocationID: new FormControl(''),
    TypeOfOrder: new FormControl(''),
    ApproveBy: new FormControl(''),
    Timeband: new FormControl(''),
  });
  isLoading:boolean = false;
  activeRequests: number = 0; 
  
  AdminDashboardData: any = [];

  onSelctionChangeBrand() {
    this.AdminDashboardInputData.get('DealerID')?.enable();
    this.AdminDashboardInputData.get('DealerID')?.reset('')
    this.AdminDashboardInputData.get('LocationID')?.reset('')
    this.AdminDashboardInputData.get('TypeOfOrder')?.reset('')
    this.AdminDashboardInputData.get('ApproveBy')?.reset('')
    this.AdminDashboardInputData.get('Timeband')?.reset('')
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    console.log("brand se data",this.AdminDashboardData)
    this.fetchDealerData(this.AdminDashboardInputData.value.BrandID);
    
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  onSelectionChangeDealer() {
    this.AdminDashboardInputData.get('LocationID')?.reset('')
    this.AdminDashboardInputData.get('TypeOfOrder')?.reset('')
    this.AdminDashboardInputData.get('ApproveBy')?.reset('')
    this.AdminDashboardInputData.get('Timeband')?.reset('')
    this.AdminDashboardInputData.get('LocationID')?.enable();
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    console.log("Dealer se Data",this.AdminDashboardData)
    this.fetchLocationData(this.AdminDashboardInputData.value.DealerID);
    
    
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  
  onSelectionChangeLocation(){
    this.AdminDashboardInputData.get('TypeOfOrder')?.reset('')
    this.AdminDashboardInputData.get('ApproveBy')?.reset('')
    this.AdminDashboardInputData.get('Timeband')?.reset('')
    this.AdminDashboardData  = this.AdminDashboardInputData.value
    this.fetchApprovedByData(this.AdminDashboardInputData.value.LocationID);
    //console.log("Location se data",this.AdminDashboardData)
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  onSelectionChangeApprovedBy() {
    
    this.AdminDashboardInputData.get('Timeband')?.reset('')
    this.AdminDashboardData = this.AdminDashboardInputData.value;
     //console.log("approved by Data",this.AdminDashboardData)
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  onSelectionChangeTypeOfOrder() {
    this.AdminDashboardInputData.get('ApproveBy')?.reset('')
    this.AdminDashboardInputData.get('Timeband')?.reset('')
    this.AdminDashboardData = this.AdminDashboardInputData.value;
     //console.log("approved by Data",this.AdminDashboardData)
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  onSelectionChangeTimeband() {
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    // console.log("approved by Data",this.AdminDashboardData)
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  


  BrandData: any = [];
  DealerData: any = [];
  LocationData: any = [];
  TypeOfOrderData: any = [];
  ApproveByData: any = [];

  AdminDashBoardNumbers: any = [];


  private startLoader() {
    this.activeRequests++;
    this.isLoading = true;
  }

  // Decrement activeRequests and set isLoading false when all requests are complete
  private stopLoader() {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.isLoading = false;
    }
  }

  fetchBrandData() {
    this.startLoader();
    this.adminDashBoardService.getAdminBrandData().subscribe((res: any) => {
      this.BrandData = res.data;
      //console.log('BrandData received');
      this.stopLoader();
      
    });
  }

  fetchDealerData(brand_id: any) {
    this.startLoader();
    this.adminDashBoardService
      .getAdminDealersData({ brand_id: brand_id })
      .subscribe((res: any) => {
        this.DealerData = res.data;
        //console.log('Dealer Data  recevied');
        this.stopLoader();
      });
  }

  fetchLocationData(dealer_id: any) {
    this.startLoader();
    this.adminDashBoardService
      .getAdminLocationData({ dealer_id: dealer_id })
      .subscribe((res: any) => {
        this.LocationData = res.data;
        this.isLoading = false;
        //console.log('location Data received');
        this.stopLoader();
      });
  }

  fetchApprovedByData(location_id: any) {
    this.startLoader();
    this.adminDashBoardService
      .getAdminApprovedByData({ location_id: location_id })
      .subscribe((res: any) => {
        this.ApproveByData = res.data;
        //console.log('ApproveBy Data received ' );
        this.stopLoader();
      });
  }

  fetchDashBoardData(data: any) {
    this.startLoader();
   // console.log("Dealer ID ",data.DealerID)
    this.adminDashBoardService
      .getAdminDashboardData({
        brand_id: data?.BrandID,
        dealer_id: data?.DealerID,
        approvedBy: data?.ApproveBy,
        timeBand: data?.Timeband,
        location_id: data?.LocationID,
        orderType: data?.TypeOfOrder
      })
      .subscribe((res: any) => {
       this.stopLoader();
       this.sumOfNotInMaster = res.data.partNotInMasterData?.yellowLineCount || 0
       this.sumofRejectedRequest = res.data.noOfRequestRejectedData?.rejectedRequestCount || 0
       this.sumofApprovedRequest = res.data.noOfRequestApprovedData?.approvedRequest || 0
       this.sumOfPendingRequest = res.data.noOfRequestPendingData?.pendingRequestCount || 0
      });
      //console.log("dashboard  data  recevied")
  }


  ngOnInit(): void {
    this.fetchBrandData();
    this.AdminDashboardInputData.get('DealerID')?.disable();
    this.AdminDashboardInputData.get('LocationID')?.disable();
   
  }
}
