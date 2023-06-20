import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginPayload } from 'src/app/shared/models/login-payload';
import { UserService } from '../../services/user.service';
import { Auth } from 'src/app/shared/models/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /* --------------------------- Constructor --------------------------- */

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /* --------------------------- Methods --------------------------- */

  onSubmit() {
    if (this.loginForm.valid) {
      const payload: LoginPayload = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      };

      this.userService.login(payload).subscribe(
        (resp) => {
          // user spread operator to copy the properties of resp into auth
          const auth: Auth = { ...resp };
          localStorage.setItem('auth', JSON.stringify(auth));
          this.toastr.success('Login successful');
          this.router.navigate(['/restaurants']);
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    } else {
      // if the username is '' mark it as dirty
      if (!this.loginForm.value.username) {
        this.loginForm.get('username')?.markAsDirty();
      }

      // if the password is '' mark it as dirty
      if (!this.loginForm.value.password) {
        this.loginForm.get('password')?.markAsDirty();
      }
    }
  }
}
