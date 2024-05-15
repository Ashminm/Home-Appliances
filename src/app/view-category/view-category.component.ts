import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  // product: any[] = [];
  // itemsByCategory: { [key: string]: any[] } = {};
  // categories: string[] = [];

  constructor(private api: ApiCallService) { }

  ngOnInit() {
    // Call getViewCategory() without passing any argument
    // Assuming you want to display all categories initially
    // this.getViewCategory();
  }

//   getViewCategory(clickedCategory?: string) {
//     this.api.getAllProducts().subscribe(
//       (res: any) => {
//         if (res && res.length > 0) {

//           if (clickedCategory) {
//             const filteredProducts = res.filter((product: any) => product.category === clickedCategory);
//             this.itemsByCategory[clickedCategory] = filteredProducts;
//           } else {
//             res.forEach((product: any) => {
//               const category = product.category;
//               if (!this.itemsByCategory[category]) {
//                 this.itemsByCategory[category] = [];
//                 if (!this.categories.includes(category)) {
//                   this.categories.push(category);
//                 }
//               }
//               this.itemsByCategory[category].push(product);
//             });
//           }
//           console.log(this.itemsByCategory);
//         } else {
//           console.error("No products found.");
//         }
//       },
//       (err: any) => {
//         console.error("API Error:", err);
//       }
//     );
//   }
}
