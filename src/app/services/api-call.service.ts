import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  SERVER_URL="http://localhost:3000"
  wishListCount=new BehaviorSubject(0)

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem('token')){
    this.getWishlistCountApi()
    }
  }

  getAllProducts(){
    return this.http.get(`${this.SERVER_URL}/all-products`)
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
  

  getWishlistCountApi(){
    return this.http.get(`${this.SERVER_URL}/get-wish`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.wishListCount.next(res.length)
    })
  }
  
}
