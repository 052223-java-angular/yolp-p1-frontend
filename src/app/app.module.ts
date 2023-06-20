import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './modules/user/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RestaurantListComponent } from './modules/restaurant/components/restaurant-list/restaurant-list.component';
import { HomeComponent } from './shared/components/home/home.component';
import { RestaurantComponent } from './modules/restaurant/components/restaurant/restaurant.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RestaurantCreateComponent } from './modules/restaurant/components/restaurant-create/restaurant-create.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NotAuthorizedComponent } from './shared/components/not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantListComponent,
    HomeComponent,
    RestaurantComponent,
    RestaurantCreateComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000, // 5 seconds
      progressBar: true,
      preventDuplicates: true,
      easeTime: 600,
      // more options...
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
