import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  private apiUrl = "http://localhost:8093/api/"

  getPartNotInData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/part-not-in-master`, data)
  }
  
  getPendingRequestData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/pending-request`,data)
  }
  

  getApprovedRequestData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/approved-request`,data)
  }

  getRejectedRequestData(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/rejected-request`,data)
  }

  getStockUpoadDatedata(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}dashboard/stock-uploaded-date`,data)
  }

}
