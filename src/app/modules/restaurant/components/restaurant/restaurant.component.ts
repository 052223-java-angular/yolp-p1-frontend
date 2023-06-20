import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from 'src/app/shared/models/restaurant';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/modules/review/services/review.service';
import { forkJoin } from 'rxjs';
import { Review } from 'src/app/shared/models/review';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewPayload } from 'src/app/shared/models/review-payload';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/shared/models/auth';

/**
 * The RestaurantComponent displays the details of a single restaurant, including its name, description, and reviews.
 */
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  resto!: Restaurant;
  reviews: Review[] = [];
  loading: boolean = true; // Add a loading property
  userRatingForm = new FormGroup({
    rating: new FormControl(null, Validators.required),
    comment: new FormControl('', Validators.required),
  });

  /* ------------------- Constructor / OnInit ------------------- */

  constructor(
    private restoService: RestaurantService,
    private reviewService: ReviewService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  /**
   * This function is called when the component is initialized.
   * It retrieves the restaurant ID from the route parameters, and then makes two requests to the server:
   * one to get the restaurant details, and one to get the reviews for that restaurant.
   * It uses forkJoin to make both requests at the same time, and then updates the component's properties
   * with the retrieved data.
   */
  ngOnInit(): void {
    // Get the id from the route
    const id = this.route.snapshot.paramMap.get('id')!;

    if (id) {
      const restaurant$ = this.restoService.getRestaurantById(id);
      const reviews$ = this.reviewService.getReviewsByRestaurantId(id);

      // Use forkJoin to make both requests at the same time
      forkJoin([restaurant$, reviews$]).subscribe({
        next: ([restaurant, reviews]) => {
          this.resto = restaurant;
          this.reviews = reviews;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
      });
    }
  }

  /* ------------------- Methods ------------------- */

  /**
   * This function is called when the user submits a review for a restaurant.
   * It first checks if the userRatingForm is valid, and if so, creates a ReviewPayload object
   * with the user's rating, comment, and user and restaurant IDs. It then calls the reviewService's
   * addReview method with the payload, and reloads the page upon success. If the form is invalid,
   * it marks the invalid fields as touched to display error messages to the user.
   */
  submitReview() {
    if (this.userRatingForm.valid) {
      for (let i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].username === this.userService.getAuth()?.username) {
          this.userRatingForm.reset();
          this.userRatingForm.controls.rating.setValue(null);
          this.toastr.error("You've already reviewed this restaurant!");
          return;
        }
      }

      const payload: ReviewPayload = {
        rating: this.userRatingForm.controls.rating.value!,
        comment: this.userRatingForm.controls.comment.value!,
        username: this.userService.getAuth()?.username!,
        userId: this.userService.getAuth()?.id!,
        restaurantId: this.resto.id,
      };
      this.reviewService.addReview(payload).subscribe({
        next: () => {
          this.ngOnInit();
          this.toastr.success('Review added!');
          this.userRatingForm.reset();
          this.userRatingForm.controls.rating.setValue(null);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      if (this.userRatingForm.controls.rating.invalid) {
        this.userRatingForm.controls.rating.markAsTouched();
      }

      if (this.userRatingForm.controls.comment.invalid) {
        this.userRatingForm.controls.comment.markAsTouched();
      }
    }
  }

  /**
   * Deletes a review from the server.
   * @param reviewId The ID of the review to delete.
   */
  deleteReview(reviewId: string): void {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.ngOnInit();
        this.toastr.success('Review deleted!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * Retrieves the authenticated user from the user service.
   * @returns The authenticated user, or null if there is no authenticated user.
   */
  getAuth(): Auth | null {
    return this.userService.getAuth();
  }
}
