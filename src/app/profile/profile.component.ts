import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profilePicture:string='https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp'
  userData:any={}
  suggestItem:any[]=[]
  // lastModifyImg:any=''
  constructor(private api:ApiCallService,private toasr:ToastrService,private route:Router){}

  ngOnInit() {
    this.getUser()
    this.getTrending()
   
  }

  getUser(){
    this.api.getUserProfile().subscribe((res:any)=>{
      this.userData=res
      // console.log("profile=",this.userData);
      if(this.userData.profileImage){
        this.profilePicture=res.profileImage
      }
    })
  
  }

  getFile(event:any){
    const file=event.target.files[0]
    // console.log(file);
    // this.lastModifyImg=file.lastModifiedDate
    // console.log(this.lastModifyImg);
    
    let fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      // console.log(event.target.result);
      this.profilePicture=event.target.result
      this.userData.profileImage=event.target.result
    }
  }

  handleUpdateUser(){     
    this.api.updateUserProfile(this.userData).subscribe((res:any)=>{
      this.toasr.success("Profile Updated Successfully!!")
    },
    (err:any)=>{
      this.toasr.error("Updation Faild",err)
      console.log(err);
      
    }
  )
  }
  
  deleteAccount(){
    this.api.deteteAccountApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getCartListCountApi()
        this.api.getWishlistCountApi()
        this.getUser()
        sessionStorage.clear()
        localStorage.clear()
        this.toasr.success("Account deleted SuccessFully!!")
        this.route.navigateByUrl('/')
      },
      error:(err)=>{
        console.log(err);
        this.toasr.error("Account Deletion Faild!!")
      }
    })
  }

  getTrending(){
    this.api.getTrendingProducts().subscribe((res:any)=>{
      this.suggestItem=res
      console.log("trending",res);
      
    })
  }




}
