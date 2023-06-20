import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Auth } from '../../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: Auth | null = this.userService.getAuth();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
