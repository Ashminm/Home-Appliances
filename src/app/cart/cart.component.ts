import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:any[]=[]
  totalAmount:any=0
  cartOffer:any=false
  couponClick:any=false
  cartDiscount:any=0
  trendingItems:any[]=[]

  constructor(private api:ApiCallService,private toastr:ToastrService,private router:Router){}

  ngOnInit() {
    this.getdata()
    this.getTrending()
  }

  getdata(){
    this.api.getCartListApi().subscribe({
      next:(res:any)=>{
        console.log("cart=",res);
        this.products=res
        this.getTotalAmount()
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
        this.getdata()
      },
      error:(err:any)=>{
        console.log(err); 
        this.toastr.error("Item Deletion Faild")
      }
    })
  }

  getTotalAmount(){
    if(this.products.length>0){
      this.totalAmount=Math.ceil(this.products.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
      // console.log(this.totalAmount); 
    }else{
      this.totalAmount=0
    }

  }

  getIncrese(id:any){
    this.api.getQuaIncreaseApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getdata()
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
        this.getdata()
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
        this.toastr.success("Clear Cart!!")
        this.api.getCartListCountApi()
        this.getdata()
        this.getTotalAmount()
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error("Cart Clear faild!!")
      }
    })
  }

  getCartOffer(){
    this.cartOffer = !this.cartOffer;
  }

  getDiscound10(){
    this.couponClick=true
    const discound=this.totalAmount * 0.1
    this.cartDiscount=discound
    this.totalAmount=Math.ceil(this.totalAmount-discound)  
  }
  getDiscound25(){
    this.couponClick=true
    const discound=this.totalAmount * 0.25
    this.cartDiscount=discound
    this.totalAmount=Math.ceil(this.totalAmount-discound)
  }
  getDiscound50(){
    this.couponClick=true
    const discound=this.totalAmount * 0.5
    this.cartDiscount=discound
    this.totalAmount=Math.ceil(this.totalAmount-discound)
  }
  getDiscound70(){
    this.couponClick=true
    const discound=this.totalAmount * 0.7
    this.cartDiscount=discound
    this.totalAmount=Math.ceil(this.totalAmount-discound)
  }

  CheckOut(){
    sessionStorage.setItem('totalAmount',this.totalAmount)
    sessionStorage.setItem('totalProduct', this.products.length.toString());
    sessionStorage.setItem('discount', this.cartDiscount);
    this.router.navigateByUrl('/checkout')
  }

  getTrending(){
    this.api.getTrendingProducts().subscribe((res:any)=>{
      this.trendingItems=res
      console.log("trending",res);
      
    })
  }

}
