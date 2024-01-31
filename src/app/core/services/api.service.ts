import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) {}

  postData(apiUrl:string , data: any): Observable<any> {
    return this.http.post<any>(apiUrl, data);
  }
  
  putData(apiUrl:string , data: any): Observable<any> {
    return this.http.put<any>(apiUrl, data);
  }

  getData(url : string) {
    return this.http.get<any>(url);
  }

  deleteData(url : string) : Observable<any> {
    const headers = new HttpHeaders();
    return this.http.delete<any>(url , {headers: headers});
  }
}
