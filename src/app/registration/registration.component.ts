import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private FormB:FormBuilder,private api:ApiCallService,private route:Router,private toastr:ToastrService){}


  regForm=this.FormB.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z 0-9-_]*'),Validators.minLength(2)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-z0-9@!#-_%]*'),Validators.minLength(6),Validators.maxLength(9)]]
  })


  getFormData(){
    // console.log(this.regForm.value);
    this.api.userRegisterApi(this.regForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success(`Successfully Registerd ${this.regForm.value.username}!!`)    
        this.route.navigateByUrl('/log')
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error("Registration Faild!!")
      }
    })
  }

  
}
