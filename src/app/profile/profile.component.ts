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

  dataLoaded = false;

  defaultProfilePicture: string = 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp';
  profilePicture: string = this.defaultProfilePicture;
  userData:any={}
  suggestItem:any[]=[]
  allReviews:any[]=[]
  show:String=''
  originalUserData:any={}
  showdelete:String= ''

  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}

  ngOnInit() {
    this.getUser()
   this.getAdmin()
    this.reviewSection()
    this.showAdmi()
    this.showadDelete()
  }

  getUser(){
    this.api.getUserProfile().subscribe((res:any)=>{
      this.userData=res ||{}
      this.originalUserData = { ...res };
      this.profilePicture = this.userData.profileImage || this.defaultProfilePicture;
      console.log("profile=", this.userData);
    })
    this.api.getrecentProducts().subscribe((res:any)=>{
      this.suggestItem=res
      // console.log("Recent",res);
      
    })

    setTimeout(() => {
      this.dataLoaded = true;
    }, 2500);
  
  }

  getAdmin(){
    this.api.getAdminProfile().subscribe((res:any)=>{
      this.userData=res || {}
      this.originalUserData = { ...res }; 
      this.profilePicture = this.userData.profileImage || this.defaultProfilePicture;
      // console.log("profile=", this.userData);
    });
  
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
  getFile(event: any) {
    const file = event.target.files[0];
    let fr = new FileReader();

    fr.onload = (event: any) => {
        this.profilePicture = event.target.result;
        if (!this.userData) {
            this.userData = {}; // Initialize userData if it's null
        }
        this.userData.profileImage = event.target.result;
        // console.log(this.userData.profileImage);
    };

    fr.readAsDataURL(file);
}


  showadDelete(){
    const existingAdmin =sessionStorage.getItem("existingAdmin");
    const role= sessionStorage.getItem("role")
    if(existingAdmin && role ==="admin"){
      this.showdelete='Delete'
    }else{
      this.showdelete=''
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

  showAdmi(){
    const existingAdmin =sessionStorage.getItem("existingAdmin");
    const role= sessionStorage.getItem("role")
    if(existingAdmin && role ==="admin"){
      this.show='customers reviews'
    }else{
      this.show='Your review'
    }
  }

  deleteReview(id:any){
    this.api.deleteUserReview(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("Review Deleted!!")
        this.reviewSection()
      },
      error:(err:any)=>{
        console.log(err); 
        this.toastr.error("Deletion Faild!!")
      }
    })
    
  }

  logout() { 
    sessionStorage.clear();
    localStorage.clear();
    this.toastr.success("Logout successfully!!")
    this.getUser()
    this.route.navigateByUrl('/log')
}

discardChanges() {
  this.userData = { ...this.originalUserData };
  this.profilePicture = this.originalUserData.profileImage || this.defaultProfilePicture; 
}

deleteImg() {
  this.profilePicture = this.defaultProfilePicture;
  this.userData.profileImage = ''; 
}
}
