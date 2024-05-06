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

  getFormLogData(){
    // console.log(this.logForm.value);
    this.api.userLoginApi(this.logForm.value).subscribe({
      next:(res:any)=>{
        console.log(res); 
        sessionStorage.setItem('existingUser',JSON.stringify(res.existingUser))
        sessionStorage.setItem('token',res.token)
        this.api.getWishlistCountApi()
        this.api.getCartListCountApi()
        this.toastr.success(`Successfully Login!!`)  
        this.route.navigateByUrl('/')
      },
      error:(err:any)=>{
        console.log(err.error); 
        this.toastr.error(err)
      }
    })
    
  }

  copyToClipboard(text:string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        this.toastr.success('Copied');
      })
      .catch(() => {
        this.toastr.error('Failed to copy');
      });
  }
}
