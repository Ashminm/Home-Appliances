import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-popupedit',
  templateUrl: './popupedit.component.html',
  styleUrls: ['./popupedit.component.css']
})
export class PopupeditComponent implements OnInit {
  category:any;
  eId:any=0
  editData:any={}
  originalData: any = {};
  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router,private aroute:ActivatedRoute){
    this.aroute.params.subscribe((res:any)=>{
      this.eId=res.id
      // console.log(this.eId);     
  })
  }

ngOnInit() {
  this.getData()
  this.getCategory() 
}
getData() {
  this.api.getAllProducts().subscribe({
    next: (res: any) => {
      this.editData = res.find((item: any) => item._id === this.eId) || {};
      // console.log(this.editData);
      this.originalData = { ...this.editData };
      
    }
  });
}

editProductData() {
  const { _id, title, price, description, category, tag, image, rating, photos } = this.editData;
  if (_id && title && price && description && category && tag && image && rating && photos) {
    this.api.editProductForm(this.editData, _id).subscribe(
      (res: any) => {
        this.toastr.success("Product Updated Successfully!!");
        this.route.navigateByUrl('/editproduct')
        this.getData();
      },
      (err: any) => {
        this.toastr.error("Update Failed!!");
      }
    );
  } else {
    this.toastr.info("Enter valid details");
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

  discardChanges() {
    this.editData = { ...this.originalData }; 
  }

}

