import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  profilePicture:any
  username:any=""
  wishCount:any=0;
  wishItem:any[]=[]
  cartCount:any=0;
  cartItem:any[]=[]
  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}

  ngOnInit() {
    if(sessionStorage.getItem("existingUser")){
      const user:any=sessionStorage.getItem("existingUser")
      this.username=JSON.parse(user).username
      this.api.wishListCount.subscribe((res:any)=>{
        this.wishCount=res
      })
      this.api.cartListCount.subscribe((res:any)=>{
        this.cartCount=res
      })
      
    }

    this.getData()
    this.getWishome()
    this.getProfile()

  }
  
  getData(){
    this.api.getHomeWishListApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.wishItem=res
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  deleteItem(id:any){
    this.api.deleteWishItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCountApi()
        sessionStorage.removeItem('totalAmount');
        this.toastr.success("Item Remove..!")
        this.getData()
      },
      error:(err:any)=>{
        console.log(err); 
        this.toastr.error("Item Deletion Faild")
      }
    })
  }


  // ------------cart---------------------

  addToCart(data:any){
    if(sessionStorage.getItem('token')){
      const { id, title, price, category, tag, image}=data
      const product={ id, title, price, category, tag, image, quantity:1}
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartListCountApi()
          this.getWishome()
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

  getWishome(){
    this.api.getHomeCartListApi().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.cartItem=res
      },
      error:(err:any)=>{
        console.log(err);     
      }
    })
  }

  deleteCartItem(id:any){
    this.api.deleteCartItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartListCountApi()
        this.toastr.success("Item Remove..!")
        this.getWishome()
      },
      error:(err:any)=>{
        console.log(err); 
        this.toastr.error("Item Deletion Faild")
      }
    })
  }

  getIncrese(id:any){
    this.api.getQuaIncreaseApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getData()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  getdecrese(id:any){
    this.api.getQuadecreaseApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getData()
        this.api.getCartListCountApi()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  clearAllCart(){
    this.api.getClearCart().subscribe({
      next:(res:any)=>{
        console.log(res);
        console.log("Clear all cart items");  
        this.api.getCartListCountApi()
        this.getData()
        // this.getTotalAmount()
      },
      error:(err)=>{
        console.log(err);
        console.log ("Cart Clear faild!!");
       
      }
    })
  }

  clearAllwish(){
    this.api.getClearWish().subscribe({
      next:(res:any)=>{
        console.log(res);
        console.log("clear all wishlist items");    
        this.api.getWishlistCountApi()
        this.getData()
      },
      error:(err)=>{
        console.log(err);
       console.log("Wishlist clear faild..!!");
       
      }
    })
  }
// ------------profile------------

  getProfile(){
    this.api.getUserProfile().subscribe((res:any)=>{
      this.profilePicture=res
      // console.log(this.profilePicture);
    })
  }

  logout() { 
    this.clearAllCart()
    this.clearAllwish()
    sessionStorage.clear();
    localStorage.clear();
    this.wishCount = 0;
    this.cartCount = 0;
    this.getData()
    this.route.navigateByUrl('/log')
}


}
