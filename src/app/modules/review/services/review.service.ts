import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/shared/models/review';
import { ReviewPayload } from 'src/app/shared/models/review-payload';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user/services/user.service';

/**
 * The ReviewService provides methods for fetching and manipulating review data.
 */
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl: string = environment.apiBaseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'auth-token': this.userService.getAuth()?.token!,
    }),
  };

  /* -------------------- Constructor -------------------- */

  constructor(private http: HttpClient, private userService: UserService) {}

  /* -------------------- Methods -------------------- */

  /**
   * Returns an Observable that emits an array of reviews for the specified restaurant ID.
   * @param id The ID of the restaurant to fetch reviews for.
   * @returns An Observable that emits an array of Review objects.
   */
  getReviewsByRestaurantId(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/review/${id}`);
  }

  addReview(review: ReviewPayload): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/review/create`,
      review,
      this.httpOptions
    );
  }

  deleteReview(reviewId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/review/delete/${reviewId}`,
      this.httpOptions
    );
  }
}
