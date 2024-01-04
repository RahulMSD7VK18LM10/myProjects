import { Component } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { DataService } from 'src/app/services/data.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products:IProduct[]=[];
  constructor(private dataService:DataService, private router:Router){
    this.dataService.getProducts().subscribe((response:IProduct[])=>{
      this.products = response;
    })
  }
  onClickHandler(id:number){
    this.router.navigate(['/product-detail',id])
  }
}
