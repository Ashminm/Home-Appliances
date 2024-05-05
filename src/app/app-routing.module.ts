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
import { AllproductComponent } from './allproduct/allproduct.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'log',component:LoginComponent},
  {path:'reg',component:RegistrationComponent},
  {path:'view/:id',component:ViewComponent},
  {path:'wish',component:WishlistComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'prof',component:ProfileComponent},
  {path:'allpro',component:AllproductComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
