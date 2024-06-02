import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-popupedit',
  templateUrl: './popupedit.component.html',
  styleUrls: ['./popupedit.component.css']
})
export class PopupeditComponent implements OnInit {
  category:any;
  editData:any={};

  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}
  @Input() itemData:any=''

ngOnInit() {
  this.getData()
  this.getCategory()
}

getData() {
  this.editData = { ...this.itemData }
  // console.log(this.editData);
}

editProductData() {
  const { _id, title, price, description, category, tag, image, rating, photos } = this.editData;
  if (_id && title && price && description && category && tag && image && rating && photos) {
    this.api.editProductForm(_id, this.editData).subscribe(
      (res: any) => {
        // console.log(res);
        this.toastr.success("Product Updated Successfully!!");
        this.route.navigateByUrl('/addproduct')
        this.getData()
      },
      (err: any) => {
        console.log(err);
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

  cancelData() {
    this.editData = {
      _id: '',
      id: '',
      title: '',
      price: '',
      rating: '',
      description: '',
      category: '',
      tag: '',
      image: '',
      photos: []
    };
  }
}

