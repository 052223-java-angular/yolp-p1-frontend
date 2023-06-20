import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from 'src/app/shared/models/restaurant';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Auth } from 'src/app/shared/models/auth';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  loading: boolean = true;

  /* --------------------------- Constructor / OnInit --------------------------- */

  ngOnInit() {
    this.restoService.getRestaurants().subscribe({
      next: (resp: Restaurant[]) => {
        this.restaurants = resp;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  constructor(
    private restoService: RestaurantService,
    private userService: UserService
  ) {}

  /* --------------------------- Methods --------------------------- */

  getAuth(): Auth | null {
    return this.userService.getAuth();
  }
}
