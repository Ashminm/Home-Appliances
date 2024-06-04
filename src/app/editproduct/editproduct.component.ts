import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  products: any[] = [];
  validCards: any[] = [];
  currentPage: number = 1;
  productsPerPage: number = 12;
  totalPage: number = 0;
  searchKey:any=""
  constructor(private api: ApiCallService,private tostr:ToastrService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.api.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.calculateTotalPages();
      this.updateValidCards();
    });
  }

  calculateTotalPages() {
    this.totalPage = Math.ceil(this.products.length / this.productsPerPage);
    if (this.currentPage > this.totalPage) {
      this.currentPage = this.totalPage;
    }
  }

  updateValidCards() {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.validCards = this.products.slice(startIndex, endIndex);
    // console.log('Valid Cards:', this.validCards);
  }

  onNext() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.updateValidCards();
    }
  }

  onPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateValidCards();
    }
  }

deleteProductItem(id:any){
  this.api.deteteProdectAdmiApi(id).subscribe({
    next:(res:any)=>{
      // console.log(res);
      this.getAllProducts()
      this.tostr.success("Product Deleted!!")
    },
    error:(err)=>{
      console.log(err);
      this.tostr.error("Product Deletion faild!!")
    }
  })
}


}
