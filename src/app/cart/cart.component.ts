import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:any[]=[]
  totalAmount:any=0
  constructor(private api:ApiCallService,private toastr:ToastrService){}

  ngOnInit() {
    this.getdata()
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
  this.totalAmount= this.products.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2)
  // console.log(this.totalAmount); 
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

}
