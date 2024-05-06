import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  SERVER_URL="http://localhost:3000"
  wishListCount=new BehaviorSubject(0)
  cartListCount=new BehaviorSubject(0)
  // homeWishList=new BehaviorSubject("")

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem('token')){
    this.getWishlistCountApi()
    this.getCartListCountApi()
    // this.getHomeWishListApi()
    }
  }

  getAllProducts(){
    return this.http.get(`${this.SERVER_URL}/all-products`)
  }
  getAllLimitProducts(){
    return this.http.get(`${this.SERVER_URL}/limit-products`)
  }
  getProduct(id:any){
    return this.http.get(`${this.SERVER_URL}/get-product/${id}`)
  }
  userRegisterApi(data:any){
    return this.http.post(`${this.SERVER_URL}/user-register`,data) 
  }
  userLoginApi(data:any){
    return this.http.post(`${this.SERVER_URL}/user-login`,data) 
  }


  appendTokenToHeader(){
    const token=sessionStorage.getItem('token')
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }


  addToWishApi(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wish`,product,this.appendTokenToHeader()) 
  }
  getWishListApi(){
    return this.http.get(`${this.SERVER_URL}/get-wish`,this.appendTokenToHeader()) 
  }
  getHomeWishListApi(){
    return this.http.get(`${this.SERVER_URL}/home-wish`,this.appendTokenToHeader()) 
  }
  deleteWishItem(id:any){
    return this.http.delete(`${this.SERVER_URL}/wish-item-delete/${id}`,this.appendTokenToHeader()) 
  }
  addToCartApi(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenToHeader()) 
  }
  getCartListApi(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenToHeader()) 
  }
  getHomeCartListApi(){
    return this.http.get(`${this.SERVER_URL}/home-cart`,this.appendTokenToHeader()) 
  }
  deleteCartItem(id:any){
    return this.http.delete(`${this.SERVER_URL}/cart-item-delete/${id}`,this.appendTokenToHeader()) 
  }
  getQuaIncreaseApi(id:any){
    return this.http.get(`${this.SERVER_URL}/incre-item/${id}`,this.appendTokenToHeader()) 
  }
  getQuadecreaseApi(id:any){
    return this.http.get(`${this.SERVER_URL}/decri-item/${id}`,this.appendTokenToHeader()) 
  }
  getClearCart(){
    return this.http.delete(`${this.SERVER_URL}/clear-cart`,this.appendTokenToHeader()) 
  }
  

  getWishlistCountApi(){
    return this.http.get(`${this.SERVER_URL}/get-wish`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.wishListCount.next(res.length)
    })
  }
  getCartListCountApi(){
     this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.cartListCount.next(res.length)
    })
  }
  
}
