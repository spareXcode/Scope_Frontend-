import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = "http://localhost:8093/api/"

  constructor(private http: HttpClient) { }
  

  getLocationData(data:any): Observable<any>{
    
    return this.http.post(`${this.apiUrl}utilities/locations`,data)
  }


  
}
