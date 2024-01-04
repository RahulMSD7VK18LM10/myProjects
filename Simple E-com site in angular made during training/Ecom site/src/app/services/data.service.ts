import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = 'https://fakestoreapi.com'
  constructor(private http: HttpClient) { }

  getCategories():Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${this.BASE_URL}/products/categories`);
  }

  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.BASE_URL}/products`);
  }

  getProductsDetails(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.BASE_URL}/products/${id}`);
  }
}
