import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData:any={}
  constructor(private api:ApiCallService){}

  ngOnInit() {
    this.getUser()
  }

  

  getUser(){
    this.api.getUserProfile().subscribe((res:any)=>{
      this.userData=res
      console.log("profile=",this.userData);
      
    })
  }
}
