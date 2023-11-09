import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    public apiUrl: any;

  constructor(private http: HttpClient,private location:Location,private auth:AuthService) {
    this.apiUrl=this.auth.apiUrl;
    console.log("api-categories",this.apiUrl);

  }
  getApiUrl(endpoint: string): string {
    const domainUrl = this.location.prepareExternalUrl('');
    const apiUrl = `${domainUrl}/api/${endpoint}`;
    return apiUrl;
  }
  // HTTP headers, if needed
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' ,    'Authorization': `Bearer ${this.auth.token}`})
  };

  // Fetch all Categorys
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl+ "/categories");
  }

  // Create a new Category
  createCategory(Category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl+ "/categories", Category, this.httpOptions);
  }


  // Update an existing Category
  updateCategory(id: number, Category: Category): Observable<Category> {
    const url = `${this.apiUrl}/categories/${id}`;
    return this.http.put<Category>(url, Category, this.httpOptions);
  }

  // Delete a Category by ID
  deleteCategory(id: number): Observable<void> {
    const url = `${this.apiUrl}/categories/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }

}
