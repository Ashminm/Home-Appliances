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
}
