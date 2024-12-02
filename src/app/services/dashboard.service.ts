import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  private apiUrl = "http://localhost:8094/api/"

  // getPartNotInData(data:any):Observable<any>{
  //   return this.http.post(`${this.apiUrl}dashboard/part-not-in-master`, data)
  // }
  
  // getPendingRequestData(data:any):Observable<any>{
  //   return this.http.post(`${this.apiUrl}dashboard/pending-request`,data)
  // }
  

  // getApprovedRequestData(data:any):Observable<any>{
  //   return this.http.post(`${this.apiUrl}dashboard/approved-request`,data)
  // }

  // getRejectedRequestData(data:any):Observable<any>{
  //   return this.http.post(`${this.apiUrl}dashboard/rejected-request`,data)
  // }

  getStockUpoadDatedata(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/stock-uploaded-date`,data)
  }

  getSpmDashBoardAllLocationData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/fetch-data-all-locations`,data)
  }

  getSpmDashboardSingleLocationData(data:any):Observable<any>{
    return this.http.post( `${this.apiUrl}dashboard/fetch-data-locations`,data)
  }

}
