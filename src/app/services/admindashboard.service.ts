import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  private apiUrl = "http://localhost:8093/api/"

  constructor(private http: HttpClient) { }


  getAdminBrandData(): Observable<any>{
    return this.http.get(`${this.apiUrl}utilities/brands`)
  }

  getAdminDealersData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}utilities/dealers`,data)
  }
  
  getAdminApprovedByData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/approved-by`,data)
  }

  getAdminLocationData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/locations`,data)
  }
  
  getAdminDashboardData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/fetch-data`,data)
  }
}
