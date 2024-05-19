import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { ApiCallService } from '../services/api-call.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  LowPriceItems:any[]=[]
  checkOutStatus:boolean=false
  total:any=sessionStorage.getItem('totalAmount')
  totalProduct:any=sessionStorage.getItem('totalProduct')
  discount:any=sessionStorage.getItem('discount')
  payPalConfig ? : IPayPalConfig;

  constructor(private FormBu:FormBuilder,private toster:ToastrService,private api:ApiCallService,private route:Router){}

  ngOnInit(){
      this.getLowPrice()
  }

  getLowPrice(){
    this.api.getLowPriceProducts().subscribe((res:any)=>{
      this.LowPriceItems=res
      // console.log("trending",res);
      
    })
  }

  checkOutForm = this.FormBu.group({
    firstname: ['',[Validators.pattern('[a-zA-Z ]*'), Validators.required]],
    lastname: ['',[Validators.pattern('[a-zA-Z ]*'), Validators.required]],
    address: ['',[Validators.pattern('[a-zA-Z 0-9(),.]*'), Validators.required]],
    state: ['',[Validators.pattern('[a-zA-Z ]*'), Validators.required]],
    town: ['',[Validators.pattern('[a-zA-Z 0-9]*'), Validators.required]],
    pincode: ['',[Validators.pattern('[0-9]{6}'), Validators.required]],
    country: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
});

checkForm() {
  if (this.checkOutForm.valid) {
    this.checkOutStatus=true
      console.log('Form is valid. Form data:', this.checkOutForm.value);
      this.initConfig()
  } else {
      this.toster.info('Invalid form data. try again!!');
  }
}


  cancelCheckOut(){
    this.checkOutForm.reset()
  }

  initConfig() {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.total,
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.total
                        }
                    }
                },
                
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any )=> {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.getClearCart().subscribe((res:any)=>{
              this.api.getCartListCountApi()
              sessionStorage.setItem('checkoutFormData', JSON.stringify(this.checkOutForm.value));
              this.toster.success("transaction Completed for Checking Out Cart")
              this.checkOutStatus=false
              this.checkOutForm.reset()
              this.route.navigateByUrl('/')
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toster.error("Transaction has been Cancelled!!")

        },
        onError: err => {
            console.log('OnError', err);
            this.toster.error("Transaction cancelled! please try after sometimes!!")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}


}
