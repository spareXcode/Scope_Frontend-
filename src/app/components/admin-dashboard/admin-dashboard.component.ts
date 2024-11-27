import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from '../top-nav-bar/top-nav-bar.component';
import { OrderRequestStatusCardComponent } from '../order-request-status-card/order-request-status-card.component';
import { SideMenueComponent } from '../side-menue/side-menue.component';
import { AdmindashboardService } from '../../services/admindashboard.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    TopNavBarComponent,
    OrderRequestStatusCardComponent,
    SideMenueComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private adminDashBoardService: AdmindashboardService) {}

  AdminDashboardInputData: FormGroup = new FormGroup({
    BrandID: new FormControl(''),
    DealerID: new FormControl({ value: '', disabled: true }),
    LocationID: new FormControl({ value: '', disabled: true }),
    TypeOfOrder: new FormControl(''),
    ApproveBy: new FormControl(''),
    Timeband: new FormControl(''),
  });
  isbrandLoaded = false;
  isDealerloaded = false;
  isLocationLoaded = false;

  AdminDashboardData: any = [];

  onSelctionChangeBrand() {
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    console.log(this.AdminDashboardData)
    this.fetchDealerData(this.AdminDashboardInputData.value.BrandID);
    this.AdminDashboardInputData.get('DealerID')?.enable();
    this.fetchDashBoardData(this.AdminDashboardData);
  }
  onSelectionChangeDealer() {
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    this.fetchLocationData(this.AdminDashboardInputData.value.DealerID);
    // console.log("Dealer Data",this.AdminDashboardData)
    this.AdminDashboardInputData.get('LocationID')?.enable();
  }

  onSelectionChangeApprovedBy() {
    this.AdminDashboardData = this.AdminDashboardInputData.value;
    this.fetchApprovedByData(this.AdminDashboardInputData.value.LocationID);

    // console.log("Dealer Data",this.AdminDashboardData)
  }

  
  isLoading = false;

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
      this.isLoading = false;
      console.log('BrandData', this.BrandData);
      
    });
    
    this.isLoading = false;
  }

  fetchDealerData(brand_id: any) {
    this.isLoading = true;
    this.adminDashBoardService
      .getAdminDealersData({ brand_id: brand_id })
      .subscribe((res: any) => {
        this.DealerData = res.data;
        console.log('Dealer Data', this.DealerData);
      });
    this.isLoading = false;
  }

  fetchLocationData(dealer_id: any) {
    this.isLoading = true;
    this.adminDashBoardService
      .getAdminLocationData({ dealer_id: dealer_id })
      .subscribe((res: any) => {
        this.LocationData = res.data;
        this.isLoading = false;
        console.log('location Data ', this.LocationData);
      });
    this.isLoading = false;
  }

  fetchApprovedByData(location_id: any) {
    this.isLoading = true;
    this.adminDashBoardService
      .getAdminApprovedByData({ location_id: location_id })
      .subscribe((res: any) => {
        this.ApproveByData = res.data;
        console.log('ApproveByData ', this.ApproveByData);
      });
    this.isLoading = false;
  }

  fetchDashBoardData(data: any) {
    this.isLoading = true;
    console.log("data ",data)
    this.adminDashBoardService
      .getAdminDashboardData({
        location_id: data?.LocationID,
        orderType: data?.TypeOfOrder,
        approvedBy: data?.ApproveBy,
        timeBand: data?.Timeband,
      })
      .subscribe((res: any) => {
        this.AdminDashBoardNumbers = res.data
      });
      this.isLoading = false;
      console.log("dashboard data ", this.AdminDashBoardNumbers)
  }


  ngOnInit(): void {
    this.fetchBrandData();
   
  }
}
