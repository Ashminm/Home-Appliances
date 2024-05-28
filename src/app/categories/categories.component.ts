import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:any[] = [];
  constructor(private api: ApiCallService) { }

  ngOnInit() {
    this.getAllProductsList();
  }


  getAllProductsList() {
    const result = this.api.getAllProducts().subscribe(
      (res: any) => {
        if (res && res.length > 0) {
          res.forEach((product: any) => {
            const category = product.category;
            const existingCategory = this.categories.findIndex(i => i.name === category);
            if (existingCategory === -1) {
              this.categories.push({ name: category, image: product.image });
            }
          });
  
          // console.log(this.categories);
        } else {
          console.error("No products.");
        }
      }
    );
  }
}
