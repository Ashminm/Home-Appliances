import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{

  pid:any=0
  product:any={}
  trendingItems:any[]=[]
 
  constructor(private aroute:ActivatedRoute, private api:ApiCallService,private toastr:ToastrService){
    this.aroute.params.subscribe((res:any)=>{
      // console.log(res.id);
      this.pid=res.id
      
    })
  }

  ngOnInit(){
    this.getData()
    this.getTrending()
  }

  getData(){
    this.api.getProduct(this.pid).subscribe((res:any)=>{
      this.product=res
      
    })
  }

  addToWish(data:any){
    if(sessionStorage.getItem('token')){
      // console.log(data);
      this.api.addToWishApi(data).subscribe({
        next:(res:any)=>{
          console.log(res);  
          this.api.getWishlistCountApi()
          this.toastr.success("Item Added to wishlist!!")
        },
        error:(err:any)=>{
          console.log(err);
          this.toastr.info("Product already exists in wishlist!!")
        }
      })
    }else{
      this.toastr.warning("Login First!")
    }
  }

  addToCart(data:any){
    if(sessionStorage.getItem('token')){
      const { id, title, price, category, tag, image}=data
      const product={ id, title, price, category, tag, image, quantity:1}
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartListCountApi()
          this.toastr.success("Item Added to Cart")
        },
        error:(err)=>[
          this.toastr.error(err.error)
        ]
      })
    }
    else{
      this.toastr.warning("Login first!!")
    }
  }

  

  getTrending(){
    this.api.getTrendingProducts().subscribe((res:any)=>{
      this.trendingItems=res
      // console.log("trending",res);
      
    })
  }

  

}
