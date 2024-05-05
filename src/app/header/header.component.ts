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

  username:any=""
  wishCount:any=0;
  wishItem:any[]=[]
  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}

  ngOnInit() {
    if(sessionStorage.getItem("existingUser")){
      const user:any=sessionStorage.getItem("existingUser")
      this.username=JSON.parse(user).username
      this.api.wishListCount.subscribe((res:any)=>{
        this.wishCount=res
      })
    }

    this.getData()
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
        this.toastr.success("Item Remove..!")
        this.getData()
      },
      error:(err:any)=>{
        console.log(err); 
        this.toastr.error("Item Deletion Faild")
      }
    })
  }

  moreWishLink(){
    if(sessionStorage.getItem('token')){
      this.route.navigateByUrl('/wish')
    }
    else{
      this.toastr.warning("login First!!!")
    }
  }

  
}
