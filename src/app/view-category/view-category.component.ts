import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categoryAllProducts:any=[]
  productCategory:any=[]
  constructor(private api: ApiCallService,private aroute:ActivatedRoute) {
    this.aroute.params.subscribe({
      next:(res:any)=>{
        this.productCategory=res.id
        // console.log(this.productCategory);  
      }
    })
   }

  ngOnInit() {
 this.getProductData()
  }

  getProductData(){
    this.api.getAllProducts().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.categoryAllProducts=res.filter((item:any)=> item.category == this.productCategory)
        // console.log(this.categoryAllProducts);
        
      }
    })
  }

}
