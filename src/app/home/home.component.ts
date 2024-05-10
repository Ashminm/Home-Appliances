import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
Router

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  products:any[]=[]

  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}


  ngOnInit() {
    this.getData()  
  }

  getData(){
    const res=this.api.getAllLimitProducts().subscribe((res:any)=>{
      // console.log(res);
      this.products=res
    },
    (err:any)=>{
      console.log(err);
      
    })
  }

  moreAllProducts(){
    if(sessionStorage.getItem('token')){
      this.route.navigateByUrl('/allpro')
    }
    else{
      this.toastr.warning("Login First!!")
    }
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

  lowToHight(){
    this.products.sort((product1,product2)=>product1.price-product2.price)
  }
  highToLow(){
    this.products.sort((product1,product2)=>product2.price-product1.price)
  }
  
}
