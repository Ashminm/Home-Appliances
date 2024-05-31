import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private FormB:FormBuilder,private api:ApiCallService,private route:Router,private toastr:ToastrService){}
  
  logForm=this.FormB.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9@!#-_%]*'),Validators.minLength(6),Validators.maxLength(9)]],
    rememberMe: [false, [Validators.requiredTrue]]
  })

  getFormLogData() {
    this.api.userLoginApi(this.logForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.role === 'user') {
          sessionStorage.removeItem('existingAdmin');
          sessionStorage.setItem('existingUser', JSON.stringify(res.existingUser));
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('role',res.role);
          this.api.getWishlistCountApi();
          this.api.getCartListCountApi();
          this.toastr.success(`Successfully Logged ${res.existingUser.username}!!`);
          this.route.navigateByUrl('/');
        } else if (res.role === 'admin') {
          sessionStorage.removeItem('existingUser');
          sessionStorage.setItem('existingAdmin', JSON.stringify(res.existingAdmin));
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('role',res.role);
          this.toastr.success(`Successfully Logged in as Admin ${res.existingAdmin.username}!!`);
          this.route.navigateByUrl('/adash');
        } else {
          this.toastr.error(`Unknown role encountered!`);
        }
      },
      error: (err: any) => {
        console.log(err.error);
        this.toastr.error("Please Enter correct email and password");
      }
    });
  }
  


  copyToClipboard(text:string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("copy");
        
      })
      .catch(() => {
        console.log('Failed to copy');
    
      });
  }
}
