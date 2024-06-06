import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  dataLoaded = false;
  panelOpenState = false;
  
  pid:any=0
  product:any={}
  trendingItems:any[]=[]
  userProfileData:any={}
  reviewproduct:any=[]
  show:boolean= false

  constructor(private aroute:ActivatedRoute, private api:ApiCallService,private toastr:ToastrService,private FormB:FormBuilder){
    this.aroute.params.subscribe((res:any)=>{
      // console.log(res.id);
      this.pid=res.id
      
    })
  }

  addReviewData=this.FormB.group({
    reviewTitle:['',[Validators.required]],
    description:['',[Validators.required]],
    username:['',[Validators.required]],
    
  })

  ngOnInit(){
    this.getData()
    this.getuserAdmiData()
    this.getReviewProductBase()
    this.showAdmi()
  }

  
  handleReview() {
    const defaultImage = 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp';
    const reviewData = this.addReviewData.value;
    const allReviewData = {
      ...reviewData,
      id: this.product.id,
      productId: this.product.id,
      title: this.product.title,
      image: this.userProfileData.profileImage ? this.userProfileData.profileImage : defaultImage
    };
  
    // console.log(allReviewData);
    this.api.reviewDataPostApi(allReviewData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("Review posted!!")
        this.addReviewData.reset()
      },
      error:(err:any)=>{
        this.toastr.error(err.error)
      }
    })
  }

  getReviewProductBase(){
    this.api.getReviewProduct().subscribe({
      next:(res:any)=>{
        console.log(res);
       this.reviewproduct=res.filter((item:any)=> item.productId == this.pid)
       console.log("Filtered by product ID =", this.reviewproduct);
       this.getData()
      }
    })

    setTimeout(() => {
      this.dataLoaded = true;
    }, 600);
  }
  
  
  getData(){
    this.api.getProduct(this.pid).subscribe((res:any)=>{
      this.product=res
      
    })
    this.api.getTrendingProducts().subscribe((res:any)=>{
      this.trendingItems=res
      // console.log("trending",res);
      
    })
  }

  addToWish(data:any){
    if(sessionStorage.getItem('token')){
      // console.log(data);
      this.api.addToWishApi(data).subscribe({
        next:(res:any)=>{
          console.log(res);  
          this.api.getWishlistCountApi()
          this.toastr.success("Item Added to wishlist!!")
        },
        error:(err:any)=>{
          console.log(err);
          this.toastr.info("Product already exists in wishlist!!")
        }
      })
    }else{
      this.toastr.warning("Login First!")
    }
  }

  addToCart(data:any){
    if(sessionStorage.getItem('token')){
      const { id, title, price, category, tag, image}=data
      const product={ id, title, price, category, tag, image, quantity:1}
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartListCountApi()
          this.toastr.success("Item Added to Cart")
        },
        error:(err)=>[
          this.toastr.error(err.error)
        ]
      })
    }
    else{
      this.toastr.warning("Login first!!")
    }
  }

  getuserAdmiData(){
    if(sessionStorage.getItem("existingUser")){
      this.api.getUserProfile().subscribe((res:any)=>{
        this.userProfileData=res
        // console.log(this.userProfileData);
      })
    } else if(sessionStorage.getItem("existingAdmin")){
      this.api.getAdminProfile().subscribe((res:any)=>{
        this.userProfileData=res
        // console.log(this.userProfileData);
      })
    }
  }

  showAdmi(){
    const existingAdmin =sessionStorage.getItem("existingAdmin");
    const role= sessionStorage.getItem("role")
    if(existingAdmin && role ==="admin"){
      this.show=true
    }else{
      this.show=false
    }
  }

  deleteReview(id:any){
    this.api.deleteUserReview(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("Review Deleted!!")
        this.getReviewProductBase()
        this.getData()
      },
      error:(err:any)=>{
        console.log(err); 
        this.toastr.error("Deletion Faild!!")
      }
    })
    
  }

}
