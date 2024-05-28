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
  show:boolean= false
  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}

  ngOnInit() {
    if(sessionStorage.getItem("existingUser") || sessionStorage.getItem("existingAdmin")) {
      if (sessionStorage.getItem("existingAdmin")) {
        const admin: any = sessionStorage.getItem("existingAdmin");
        const adminUsername = JSON.parse(admin).username;
        this.username = adminUsername;
      } else if (sessionStorage.getItem("existingUser")) {
        const user: any = sessionStorage.getItem("existingUser");
        const userUsername = JSON.parse(user).username;
        this.username = userUsername;
      }
    
      this.api.wishListCount.subscribe((res:any) => {
        this.wishCount = res;
        this.getData()
      });
    
      this.api.cartListCount.subscribe((res:any) => {
        this.cartCount = res;
        this.getCarthome()
      });
    }
    
    this.getData()
    this.getCarthome()
    this.getProfile()
    this.showAdmi()
  }

  showAdmi(){
    const existingAdmin =sessionStorage.getItem("existingAdmin");
    const role= sessionStorage.getItem("role")
    if(existingAdmin && role ==="admin"){
      this.show=true
    }else{
      this.show=false
    }
  }
  
  getData(){
    this.api.getHomeWishListApi().subscribe({
      next:(res:any)=>{
        console.warn(res);
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
        console.warn(res);
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
          this.getCarthome()
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

  getCarthome(){
    this.api.getHomeCartListApi().subscribe({
      next:(res:any)=>{
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
        console.warn(res);
        this.api.getCartListCountApi()
        this.toastr.success("Item Remove..!")
        this.getCarthome()
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
        console.warn(res);
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
        console.warn(res);;
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
        console.warn(res);
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
        console.warn(res);
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
    if(sessionStorage.getItem("existingUser")){
      this.api.getUserProfile().subscribe((res:any)=>{
        this.profilePicture=res
        // console.log(this.profilePicture);
      })
    } else if(sessionStorage.getItem("existingAdmin")){
      this.api.getAdminProfile().subscribe((res:any)=>{
        this.profilePicture=res
        // console.log(this.profilePicture);
      })
    }
   
  }

  clear() { 
    if(sessionStorage.getItem("existingUser")) {
      sessionStorage.clear();
      localStorage.clear();
      this.clearAllCart()
      this.clearAllwish()
      this.getData(); 
      this.route.navigateByUrl('/log');
    } else if(sessionStorage.getItem("existingAdmin")) {
      this.toastr.info("You are an Admin");
      this.route.navigateByUrl('/prof')
    }
  }

}
