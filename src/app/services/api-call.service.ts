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

  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem('token')){
    this.getWishlistCountApi()
    this.getCartListCountApi()
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
  adminLoginApi(data:any){
    return this.http.post(`${this.SERVER_URL}/admin-login`,data) 
  }
  getTrendingProducts(){
    return this.http.get(`${this.SERVER_URL}/trending-product`)
  }
  getrecentProducts(){
    return this.http.get(`${this.SERVER_URL}/recent-products`)
  }
  getLowPriceProducts(){
    return this.http.get(`${this.SERVER_URL}/low-price-product`)
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
  // getQuaViewdecreaseApi(id:any){
  //   return this.http.get(`${this.SERVER_URL}/decri-view-item/${id}`,this.appendTokenToHeader()) 
  // }
  getClearCart(){
    return this.http.delete(`${this.SERVER_URL}/clear-cart`,this.appendTokenToHeader()) 
  }
  getClearWish(){
    return this.http.delete(`${this.SERVER_URL}/clear-wish`,this.appendTokenToHeader()) 
  }
  getUserProfile(){
    return this.http.get(`${this.SERVER_URL}/user-profile`,this.appendTokenToHeader()) 
  }
  updateUserProfile(data:any){
    return this.http.put(`${this.SERVER_URL}/user-profile`,data,this.appendTokenToHeader()) 
  }
  deteteAccountApi(){
    return this.http.delete(`${this.SERVER_URL}/delete-account`,this.appendTokenToHeader()) 
  }

  getAdminProfile(){
    return this.http.get(`${this.SERVER_URL}/admin-profile`,this.appendTokenToHeader()) 
  }
  updateAdminProfile(data:any){
    return this.http.put(`${this.SERVER_URL}/admin-profile`,data,this.appendTokenToHeader()) 
  }
  deteteAdminAccountApi(){
    return this.http.delete(`${this.SERVER_URL}/delete-admin-account`,this.appendTokenToHeader()) 
  }
  getAllUseraApi(){
    return this.http.get(`${this.SERVER_URL}/all-users`,this.appendTokenToHeader())
  }
  postProductForm(data:any){
    return this.http.post(`${this.SERVER_URL}/add-product`,data) 
  }
  editProductForm(id:any){
    return this.http.put(`${this.SERVER_URL}/admin-edit-product/${id}`,this.appendTokenToHeader()) 
  }

  getSpecificProduct(id:any){
    return this.http.put(`${this.SERVER_URL}/admin-edit-product/${id}`,this.appendTokenToHeader())
  }
  
  deteteProdectAdmiApi(id:any){
  return this.http.delete(`${this.SERVER_URL}/product-delete/${id}`,this.appendTokenToHeader()) 
  }

  deteteUserAccountApi(id:any){
  return this.http.delete(`${this.SERVER_URL}/delete-user/${id}`,this.appendTokenToHeader()) 
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

  isLoggedIn(){
    return !!sessionStorage.getItem('token')
  }
  
}
