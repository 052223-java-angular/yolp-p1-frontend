import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RegisterPayload } from 'src/app/shared/models/register-payload';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/shared/models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });

  /* --------------------------- Constructor --------------------------- */

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /* --------------------------- Methods --------------------------- */

  onSubmit() {
    if (this.registerForm.valid) {
      const payload: RegisterPayload = {
        username: this.registerForm.value.username!,
        password: this.registerForm.value.password!,
        confirmPassword: this.registerForm.value.confirmPassword!,
      };

      this.userService.register(payload).subscribe(
        (resp) => {
          const auth: Auth = { ...resp };
          this.toastr.success('Registration Successful');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.registerForm.reset();
          this.toastr.error(error.error.message);
        }
      );
    } else {
      // if the username is '' mark it as dirty
      if (!this.registerForm.value.username) {
        this.registerForm.get('username')?.markAsDirty();
      }

      // if the password is '' mark it as dirty
      if (!this.registerForm.value.password) {
        this.registerForm.get('password')?.markAsDirty();
      }

      // if the confirmPassword is '' mark it as dirty
      if (!this.registerForm.value.confirmPassword) {
        this.registerForm.get('confirmPassword')?.markAsDirty();
      }
    }
  }
}
