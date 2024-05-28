import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
// import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  category:any
 
  constructor(private FormB:FormBuilder,private api:ApiCallService,private toster:ToastrService){}

  ngOnInit(){
    this.getCategory()
  }

  addProductdata=this.FormB.group({
    id:['',[Validators.required, Validators.pattern('[0-9]*'),Validators.minLength(1)]],
    title:['',[Validators.required]],
    price:['',[Validators.required, Validators.pattern('[0-9 .]*'),Validators.minLength(1)]],
    rating:['',[Validators.required,Validators.pattern('[0-9 .]*'),Validators.minLength(1)]],
    description:['',[Validators.required]],
    category:['',[Validators.required]],
    tag:['',[Validators.required]],
    image: ['', [Validators.required, Validators.pattern('https?://(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&/=]*)')]],
    photos1: ['', [Validators.required, Validators.pattern('https?://(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&/=]*)')]],
    photos2: ['', [Validators.required, Validators.pattern('https?://(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&/=]*)')]],
    photos3: ['', [Validators.required, Validators.pattern('https?://(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&/=]*)')]]
  })

  formProductData() {
    const formValue = this.addProductdata.value;
    const photosArray = [formValue.photos1, formValue.photos2, formValue.photos3];
    const productData = {
      ...formValue,
      photos: photosArray
    };
    // console.log(productData);
  
    this.api.postProductForm(productData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toster.success("Product Added Successfully!!");
        this.addProductdata.reset()
      },
      error: (err: any) => {
        console.log(err.error);
        this.toster.error("Add Failed!!");
      }
    });
  }

  getCategory() {
    this.api.getAllProducts().subscribe((res: any) => {
      const allCategories = res.map((product: any) => product.category);
      const uniqueCategories = Array.from(new Set(allCategories));
      
      this.category = uniqueCategories;
      // console.log(this.category);
    });
  }
  
  cancelData(){
    this.addProductdata.reset()
  }


  
}
