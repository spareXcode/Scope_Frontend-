import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  private apiUrl = "http://localhost:8093/api/"

  getDashboardData(data:any):Observable<any>{
    return this.http.get(`${this.apiUrl}dashboard/part-not-in-master`,{params: data})
  }
}
