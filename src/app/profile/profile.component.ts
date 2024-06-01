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
  allReviews:any[]=[]
  show:String=''
  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}

  ngOnInit() {
    this.getUser()
    this.getRecent()
   this.getAdmin()
    this.reviewSection()
    this.showAdmi()
  }

  getUser(){
    this.api.getUserProfile().subscribe((res:any)=>{
      this.userData=res
      console.log("profile=",this.userData);
      if(this.userData.profileImage){
        this.profilePicture=res.profileImage
      }
    })
  
  }

  getAdmin(){
    this.api.getAdminProfile().subscribe((res:any)=>{
      this.userData=res
      // console.log("profile=",this.userData);
      if(this.userData.profileImage){
        this.profilePicture=res.profileImage
      }
    })
  
  }

  reviewSection(){
    if(sessionStorage.getItem("existingAdmin")){
      this.api.getAllAdminReviews().subscribe({
        next:(res:any)=>{
          console.log("Reviews=",res);
          this.allReviews=res
          // console.log(this.allReviews);  
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }else if(sessionStorage.getItem("existingUser")){
      this.api.getyourReviews().subscribe({
        next:(res:any)=>{
          console.log("Reviews=",res);
          this.allReviews=res
          // console.log(this.allReviews);  
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
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

  handleUpdateProfile() {
    if (sessionStorage.getItem("existingUser")) {
      this.api.updateUserProfile(this.userData).subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success("Profile Updated Successfully!!");
        },
        (err: any) => {
          console.log(err);
          this.toastr.error("Updation Failed", err.error);
        }
      );
    } else if (sessionStorage.getItem("existingAdmin")) {
      this.api.updateAdminProfile(this.userData).subscribe(
        (res: any) => {
          console.log(res);
          this.toastr.success("Profile Updated Successfully!!");
        },
        (err: any) => {
          console.log(err);
          this.toastr.error("Updation Failed", err.error);
        }
      );
    }
  }
  
  
  
  deleteAccount(){
    const existingAdmin =sessionStorage.getItem("existingUser");
    const role= sessionStorage.getItem("role")
    if(existingAdmin && role ==="user"){
      this.api.deteteAccountApi().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartListCountApi()
          this.api.getWishlistCountApi()
          this.getUser()
          sessionStorage.clear()
          localStorage.clear()
          this.toastr.success("Account deleted SuccessFully!!")
          this.route.navigateByUrl('/')
        },
        error:(err)=>{
          console.log(err);
          this.toastr.error("Account Deletion Faild!!")
        }
      })
    }
    else{
      this.toastr.info("Your an admin")
    } 
  }

  getRecent(){
    this.api.getrecentProducts().subscribe((res:any)=>{
      this.suggestItem=res
      // console.log("Recent",res);
      
    })
  }

  showAdmi(){
    const existingAdmin =sessionStorage.getItem("existingAdmin");
    const role= sessionStorage.getItem("role")
    if(existingAdmin && role ==="admin"){
      this.show='customers reviews'
    }else{
      this.show='Your review'
    }
  }

  logout() { 
    sessionStorage.clear();
    localStorage.clear();
    this.toastr.success("Logout successfully!!")
    this.getUser()
    this.route.navigateByUrl('/log')
}


}
