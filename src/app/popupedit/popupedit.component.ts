import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-popupedit',
  templateUrl: './popupedit.component.html',
  styleUrls: ['./popupedit.component.css']
})
export class PopupeditComponent implements OnInit {
  category:any;
  editData:any={}

  constructor(private api:ApiCallService){}
  @Input() itemData:any=''

ngOnInit() {
  this.getData()
  this.getCategory()
}

  getData(){
    this.editData = { ...this.itemData };
    // console.log(this.editData);
    
  }

  editProductData(form: NgForm) {
    if (form.valid) {
      this.api.editProductForm(this.editData).subscribe({
        next:(res:any)=>{
          console.log("Finel products",res);
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      }
       
      );
    } else {
      console.error('Form is invalid');
    }
  }

  getCategory() {
    this.api.getAllProducts().subscribe((res: any) => {
      const allCategories = res.map((product: any) => product.category);
      const uniqueCategories = Array.from(new Set(allCategories));
      
      this.category = uniqueCategories;
      // console.log(this.category);
    });
  }
}

