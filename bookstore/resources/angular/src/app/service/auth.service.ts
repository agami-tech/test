import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public apiUrl: any;
    public token:string = '';
  constructor(private http: HttpClient,private location:Location) {
    this.apiUrl = this.getApiUrl('api');
this.apiUrl =  window.location.href.replace('/assets/angular','');
this.apiUrl=this.apiUrl+"api";
console.log("apiURL",this.apiUrl);
//this.apiUrl="https://amol.com/api"
//console.log("apiURL",this.apiUrl);

  }
  getApiUrl(endpoint: string): string {
    const domainUrl = this.location.prepareExternalUrl('');
    const apiUrl = `${domainUrl}/api/${endpoint}`;
    return apiUrl;
  }
  // HTTP headers, if needed
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  login(auth: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+ "/login", auth, this.httpOptions);
  }
  register(auth: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+ "/register", auth, this.httpOptions);
  }


}
