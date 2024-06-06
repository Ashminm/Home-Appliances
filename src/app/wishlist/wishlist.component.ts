import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  dataLoaded = false;
  products:any[]=[]
  constructor(private api:ApiCallService,private toastr:ToastrService){}

  ngOnInit() {
    this.getdata()
  }

  getdata(){
    this.api.getWishListApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.products=res
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

    setTimeout(() => {
      this.dataLoaded = true;
    }, 1000);
  }

  deleteItem(id:any){
    this.api.deleteWishItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCountApi()
        this.toastr.success("Item Remove..!")
        this.getdata()
      },
      error:(err:any)=>{
        console.log(err);  
        this.toastr.error("Item Deletion Faild")
      }
    })
  }
  deleteCartItem(id:any){
    this.api.deleteWishItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCountApi()
        // this.toastr.success("Item Remove..!")
        this.getdata()
      },
      error:(err:any)=>{
        console.log(err);  
        // this.toastr.error("Item Deletion Faild")
      }
    })
  }

  addToCart(data:any){
    if(sessionStorage.getItem('token')){
      const { id, title, price, category, tag, image}=data
      const product={ id, title, price, category, tag, image, quantity:1}
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartListCountApi()
          this.toastr.success("Item Added to Cart!!")
          this.deleteCartItem(data._id)
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
}
