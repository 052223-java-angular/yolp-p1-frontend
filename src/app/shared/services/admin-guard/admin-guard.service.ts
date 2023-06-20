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
export class AdminGuardService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: Auth | null = this.userService.getAuth();

    if (user && user?.role === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/not-authorized']);
    return false;
  }
}
