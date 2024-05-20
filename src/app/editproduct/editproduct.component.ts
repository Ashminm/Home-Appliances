import { Component } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  product:any
  constructor(private api:ApiCallService){}

ngOnInit() {
 this.getAllProduct() 
}

getAllProduct(){
  this.api.getAllProducts().subscribe((res:any)=>{
    this.product=res
    console.log(this.product);
  })
}

}
