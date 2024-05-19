import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewComponent } from './view/view.component';
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { SearchPipe } from './pips/search.pipe';
import { CategoriesComponent } from './categories/categories.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { ContactComponent } from './contact/contact.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { CalenderComponent } from './calender/calender.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { AddproductComponent } from './addproduct/addproduct.component';

import {MatTabsModule} from '@angular/material/tabs';
import { EditproductComponent } from './editproduct/editproduct.component';

// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';
// import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    ViewComponent,
    ProfileComponent,
    AllproductsComponent,
    SearchPipe,
    CategoriesComponent,
    ViewCategoryComponent,
    ContactComponent,
    AdmindashComponent,
    CalenderComponent,
    AddproductComponent,
    EditproductComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPayPalModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,

    MatTabsModule,
    // MatInputModule,
    // MatSelectModule,
    // MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
