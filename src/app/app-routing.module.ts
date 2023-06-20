import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { RestaurantListComponent } from './modules/restaurant/components/restaurant-list/restaurant-list.component';
import { HomeComponent } from './shared/components/home/home.component';
import { RestaurantComponent } from './modules/restaurant/components/restaurant/restaurant.component';
import { AuthGuardService } from './shared/services/auth-guard/auth-guard.service';
import { RestaurantCreateComponent } from './modules/restaurant/components/restaurant-create/restaurant-create.component';
import { AdminGuardService } from './shared/services/admin-guard/admin-guard.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NotAuthorizedComponent } from './shared/components/not-authorized/not-authorized.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'restaurants',
    component: RestaurantListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'restaurants/create',
    component: RestaurantCreateComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'restaurant/:id',
    component: RestaurantComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
