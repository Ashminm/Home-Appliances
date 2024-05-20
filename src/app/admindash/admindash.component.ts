import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit{

  profilePicture:any
  products:any[]=[]
  allUser:any[]=[]
constructor(private api:ApiCallService){}

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
    console.log(this.allUser);
  })
  this.api.getAdminProfile().subscribe((res:any)=>{
    this.profilePicture=res
    // console.log(this.profilePicture);
    
  })
}

}
