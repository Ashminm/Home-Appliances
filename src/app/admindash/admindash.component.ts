import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit{

  today: number;
  profilePicture:any
  products:any[]=[]
  allUser:any[]=[]
  searchKey:String=''
  reviews:any[]=[]
  originalReviews: any[]=[];
  feetCount:any=sessionStorage.getItem('feedCount')
  constructor(private api:ApiCallService,private route:Router,private tostr:ToastrService){
    this.today = Date.now();
    setInterval(() => {
        this.today = Date.now();
    }, 1000);
  }

ngOnInit(){
  this.getdata()
  this.getUser()
}

getdata(){
  this.api.getAllProducts().subscribe((res:any)=>{
    this.products=res
  })
this.api.getAllAdminReviews().subscribe((res:any)=>{
  this.reviews=res
  // console.log("Reviws:",this.reviews);
  this.originalReviews = [...res]
  
})

}


getUser(){
  this.api.getAllUseraApi().subscribe((res:any)=>{
    this.allUser=res
    // console.log(this.allUser);
  })
  this.api.getAdminProfile().subscribe((res:any)=>{
    this.profilePicture=res
    // console.log(this.profilePicture);
    
  })
}

deleteUser(id:any){
  this.api.deteteUserAccountApi(id).subscribe({
    next:(res:any)=>{
      console.warn(res);
      this.tostr.success("Account Deleted!!")
      this.getUser()
    },
    error:(err:any)=>{
      console.log(err); 
      this.tostr.error("Account Deletion Faild!!")
    }
  })
}

deleteReview(id:any){
  this.api.deleteUserReview(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.tostr.success("Review Deleted!!")
      this.getdata()
    },
    error:(err:any)=>{
      console.log(err); 
      this.tostr.error("Deletion Faild!!")
    }
  })
}

clearAllReview(){
  this.api.clearAllreview().subscribe({
    next:(res:any)=>{
      this.tostr.success(`Delete all reviews!!`)
      this.getdata()
    },
    error:(err:any)=>{
      this.tostr.error("Detetion Faild!!")
      console.log(err);
      
    }
  })
}

sortByName(){
  this.reviews.sort((name1:any,name2:any)=>name1.username.localeCompare(name2.username))
}
sortedByTitle(){
  this.reviews.sort((ti1:any,ti2:any)=>ti1.reviewTitle.localeCompare(ti2.reviewTitle))
}
clearSortReview() {
  this.reviews = [...this.originalReviews];
}

logout() { 
  sessionStorage.clear();
  localStorage.clear();
  this.getUser()
  this.tostr.success("Logout successfully!!")
  this.route.navigateByUrl('/log')
}

}
