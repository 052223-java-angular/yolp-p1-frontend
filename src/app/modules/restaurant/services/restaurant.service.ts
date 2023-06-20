import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/shared/models/restaurant';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user/services/user.service';
import { RestaurantPayload } from 'src/app/shared/models/restaurant-payload';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  baseUrl: string = environment.apiBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'auth-token': this.userService.getAuth()?.token!,
    }),
  };

  /* --------------------------- Constructor --------------------------- */

  constructor(private http: HttpClient, private userService: UserService) {}

  /* --------------------------- Methods --------------------------- */

  createRestaurant(restaurant: RestaurantPayload): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/restaurant/create`,
      restaurant,
      this.httpOptions
    );
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/restaurant/${id}`);
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/restaurant/all`);
  }
}
