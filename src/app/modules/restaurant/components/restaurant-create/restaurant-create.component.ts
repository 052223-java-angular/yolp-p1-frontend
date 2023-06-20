import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantPayload } from 'src/app/shared/models/restaurant-payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css'],
})
export class RestaurantCreateComponent {
  states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  restoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\\s\\-]*$/),
    ]),
    state: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Za-z]{2}$/),
    ]),
    zip: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}(?:-\d{4})?$/),
    ]),
    imgUrl: new FormControl('', Validators.required),
  });

  /* --------------------------- Constructor --------------------------- */

  constructor(
    private restoService: RestaurantService,
    private toastr: ToastrService
  ) {}

  /* --------------------------- Methods --------------------------- */

  onSubmit(): void {
    if (this.restoForm.valid) {
      const payload: RestaurantPayload = {
        name: this.restoForm.controls.name.value!,
        address: this.restoForm.controls.address.value!,
        city: this.restoForm.controls.city.value!,
        state: this.restoForm.controls.state.value!,
        zip: this.restoForm.controls.zip.value!,
        imgUrl: this.restoForm.controls.imgUrl.value!,
      };

      this.restoService.createRestaurant(payload).subscribe({
        next: (response) => {
          this.restoForm.reset();
          this.toastr.success('Restaurant created successfully');
        },
        error: (err) => {
          this.toastr.error('Error creating restaurant');
        },
      });
    } else {
      if (this.restoForm.controls.name.invalid) {
        this.restoForm.controls.name.markAsTouched();
      }

      if (this.restoForm.controls.address.invalid) {
        this.restoForm.controls.address.markAsTouched();
      }

      if (this.restoForm.controls.city.invalid) {
        this.restoForm.controls.city.markAsTouched();
      }

      if (this.restoForm.controls.state.invalid) {
        this.restoForm.controls.state.markAsTouched();
      }

      if (this.restoForm.controls.zip.invalid) {
        this.restoForm.controls.zip.markAsTouched();
      }

      if (this.restoForm.controls.imgUrl.invalid) {
        this.restoForm.controls.imgUrl.markAsTouched();
      }
    }
  }
}
