import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { DataService } from 'src/app/services/data.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productDetail?:IProduct;
  id:any;
  constructor(private dataService:DataService, private activatedrouter:ActivatedRoute){
    this.id=this.activatedrouter.snapshot.paramMap.get('id');
    this.dataService.getProductsDetails(this.id).subscribe((response:IProduct)=>{
      this.productDetail = response;
    })
  }
}
