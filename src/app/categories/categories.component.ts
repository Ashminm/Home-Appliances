import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  product: any[] = [];
  itemsByCategory: { [key: string]: any[] } = {};
  categories: { name: string, image: string }[] = [];

  constructor(private api: ApiCallService) { }

  ngOnInit() {
    this.getAllProductsList();
  }

  getAllProductsList() {
    const result = this.api.getAllProducts().subscribe(
      (res: any) => {
        if (res && res.length > 0) {
          // console.log(res); // Log the entire response to inspect its structure

          res.forEach((product: any) => {
            const category = product.category;
            if (!this.itemsByCategory[category]) {
              this.itemsByCategory[category] = [];
            }
            this.itemsByCategory[category].push(product);
          });

          // Populate categories array with unique category names and images
          Object.keys(this.itemsByCategory).forEach(category => {
            const categoryProducts = this.itemsByCategory[category];
            // Assuming category name and image are directly accessible properties of product
            const categoryName = categoryProducts[0].category;
            const categoryImage = categoryProducts[0].image;
            this.categories.push({ name: categoryName, image: categoryImage });
          });

          console.log(this.itemsByCategory);
          console.log(this.categories);
        } else {
          console.error("No products found.");
        }
      },
      (err: any) => {
        console.error("API Error:", err);
      }
    );
  }
}
