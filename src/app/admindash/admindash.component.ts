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
  today: number = Date.now();
  profilePicture:any
  products:any[]=[]
  allUser:any[]=[]
  searchKey:String=''
  constructor(private api:ApiCallService,private route:Router,private tostr:ToastrService){
    setInterval(() => {this.today = Date.now()}, 1);
  }

ngOnInit(){
  this.getdata()
  this.getUser()
}

getdata(){
  this.api.getAllProducts().subscribe((res:any)=>{
    this.products=res
  })
}


getUser(){
  this.api.getAllUseraApi().subscribe((res:any)=>{
    this.allUser=res
    console.warn(this.allUser);
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

logout() { 
  sessionStorage.clear();
  localStorage.clear();
  this.getUser()
  this.tostr.success("Logout successfully!!")
  this.route.navigateByUrl('/log')
}

}
