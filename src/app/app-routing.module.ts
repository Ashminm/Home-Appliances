import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewComponent } from './view/view.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { authGuard } from './guards/auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { PopupeditComponent } from './popupedit/popupedit.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'log',component:LoginComponent},
  {path:'reg',component:RegistrationComponent},
  {path:'view/:id',component:ViewComponent},
  {path:'wish',canActivate:[authGuard],component:WishlistComponent},
  {path:'cart',canActivate:[authGuard],component:CartComponent},
  {path:'checkout',canActivate:[authGuard],component:CheckoutComponent},
  {path:'prof',canActivate:[authGuard],component:ProfileComponent},
  {path:'allpro',component:AllproductsComponent},
  {path:'cate',component:CategoriesComponent},
  {path:'viewcate/:id',component:ViewCategoryComponent},
  {path:'contact',component:ContactComponent},
  {path:'adash',canActivate:[authGuard],component:AdmindashComponent},
  {path:'addproduct',canActivate:[authGuard],component:AddproductComponent},
  {path:'editproduct',canActivate:[authGuard],component:EditproductComponent},
  {path:'popupedit/:id',canActivate:[authGuard],component:PopupeditComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
