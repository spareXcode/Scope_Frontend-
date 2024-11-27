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
  
  AdminDashboardData: any = [];

  onSelctionChangeBrand() {
    this.AdminDashboardInputData.get('DealerID')?.enable();
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    console.log("brand se data",this.AdminDashboardData)
    this.fetchDealerData(this.AdminDashboardInputData.value.BrandID);
    
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  onSelectionChangeDealer() {
    this.AdminDashboardInputData.get('LocationID')?.enable();
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    console.log("Dealer se Data",this.AdminDashboardData)
    this.fetchLocationData(this.AdminDashboardInputData.value.DealerID);
    
    
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  
  onSelectionChangeLocation(){
    this.AdminDashboardData  = this.AdminDashboardInputData.value
    this.fetchApprovedByData(this.AdminDashboardInputData.value.LocationID);
    console.log("Location se data",this.AdminDashboardData)
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  onSelectionChangeApprovedBy() {
    this.AdminDashboardData = this.AdminDashboardInputData.value;
     console.log("approved by Data",this.AdminDashboardData)
    this.fetchDashBoardData(this.AdminDashboardData);
  }


  BrandData: any = [];
  DealerData: any = [];
  LocationData: any = [];
  TypeOfOrderData: any = [];
  ApproveByData: any = [];

  AdminDashBoardNumbers: any = [];

  fetchBrandData() {
    this.isLoading = true;
    this.adminDashBoardService.getAdminBrandData().subscribe((res: any) => {
      this.BrandData = res.data;
      console.log('BrandData received');
      this.isLoading = false;
      
    });
  }

  fetchDealerData(brand_id: any) {
    this.isLoading = true;
    this.adminDashBoardService
      .getAdminDealersData({ brand_id: brand_id })
      .subscribe((res: any) => {
        this.DealerData = res.data;
        console.log('Dealer Data  recevied');
        this.isLoading = false;
      });
  }

  fetchLocationData(dealer_id: any) {
    this.isLoading = true;
    this.adminDashBoardService
      .getAdminLocationData({ dealer_id: dealer_id })
      .subscribe((res: any) => {
        this.LocationData = res.data;
        this.isLoading = false;
        console.log('location Data received');
        this.isLoading = false;
      });
  }

  fetchApprovedByData(location_id: any) {
    this.isLoading = true;
    this.adminDashBoardService
      .getAdminApprovedByData({ location_id: location_id })
      .subscribe((res: any) => {
        this.ApproveByData = res.data;
        console.log('ApproveBy Data received ' );
        this.isLoading = false;
      });
  }

  fetchDashBoardData(data: any) {
    this.isLoading = true;
    console.log("Dealer ID ",data.DealerID)
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
       this.sumOfNotInMaster = res.data.partNotInMasterData.yellowLineCount
       this.sumofRejectedRequest = res.data.noOfRequestRejectedData.rejectedRequestCount
       this.sumofApprovedRequest = res.data.noOfRequestApprovedData.approvedRequest
       this.sumOfPendingRequest = res.data.noOfRequestPendingData.pendingRequestCount
       this.isLoading = false;
      });
      console.log("dashboard  data  recevied")
  }


  ngOnInit(): void {
    this.fetchBrandData();
    this.AdminDashboardInputData.get('DealerID')?.disable();
    this.AdminDashboardInputData.get('LocationID')?.disable();
   
  }
}
