import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  // product:any[]=[]
  products: any[] = [];
  validCards: any;
  currentPage: number = 1;
  productsPerPage: number = 12;
  totalPage: number = 0;

  constructor(private api: ApiCallService) {}

  ngOnInit(){
    this.getAllProducts();
  }

  getAllProducts() {
    this.api.getAllProducts().subscribe((res: any) => {
      this.products = res;
      // this.product=res
      this.calculateTotalPages();
      this.updateValidCards();
    });
  }

  calculateTotalPages(){
    this.totalPage = Math.ceil(this.products.length / this.productsPerPage);
  }

  updateValidCards(){
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.validCards = this.products.slice(startIndex, endIndex);
    console.log(this.validCards);
    
  }

  onNext(){
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.updateValidCards();
    }
  }

  onPrev(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateValidCards();
    }
  }
}
