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

  eProduct:any={}
  constructor(private api:ApiCallService,private toastr:ToastrService,private route:Router){}
  @Input() itemId:String=''

ngOnInit() {
  // this.getData()
  this.getCategory()
  
}

getData() {
  this.api.getAllProducts().subscribe({
    next:(res:any)=>{
      // console.log(res);
      this.eProduct=res.filter((item:any)=> item.id ==this.itemId)
      console.log("Filter:",this.eProduct);
      
    }
  })
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

