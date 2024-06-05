import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private FormB:FormBuilder,private api:ApiCallService,private toastr:ToastrService){}

  conForm=this.FormB.group({
    firstname:['',[Validators.required,Validators.pattern('[a-zA-Z 0-9-_ ]*'),Validators.minLength(3)]],
    lastname:['',[Validators.pattern('[a-zA-Z 0-9-_ ]*'),Validators.minLength(2)]],
    email:['',[Validators.required,Validators.email]],
    subject:['',[Validators.required,Validators.pattern('[a-zA-Z 0-9-_, ]*'),Validators.minLength(1)]],
    messege:['',[Validators.required,Validators.pattern("[a-zA-Z 0-9-,_@#$%&*()!?. '\"`]*"),Validators.minLength(1)]],
  })


  handleContactForm(){
    this.api.contactUserApi(this.conForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success(`${this.conForm.value.firstname} we can receve your feedback!!`)
        this.conForm.reset()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }

  resetForm(){
    this.conForm.reset()
  }


}
