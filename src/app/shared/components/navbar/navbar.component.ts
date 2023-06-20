import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Auth } from '../../models/auth';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * The NavbarComponent displays the navigation bar at the top of the app.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  dropdownOpen: boolean = false;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  clickListener: Function = () => {};

  constructor(
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {
    // Subscribe to router events to close the dropdown menu when the user navigates to a new page
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.dropdownOpen = false;
      }
    });
  }

  /**
   * Initializes the component by adding a click listener to the document to close the dropdown menu when the user clicks outside of it.
   */
  ngOnInit() {
    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        if (
          this.dropdownOpen &&
          this.dropdownMenu &&
          !this.dropdownMenu.nativeElement.contains(event.target as Node)
        ) {
          this.dropdownOpen = false;
        }
      }
    );
  }

  /**
   * Cleans up the component by removing the click listener from the document.
   */
  ngOnDestroy() {
    this.clickListener(); // remove the listener when the component is destroyed
  }

  /**
   * Toggles the dropdown menu open or closed.
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Returns the authenticated user, or null if the user is not authenticated.
   */
  getAuth(): Auth | null {
    return this.userService.getAuth();
  }

  /**
   * Logs the user out by removing the authentication token from local storage and navigating to the home page.
   */
  logout(): void {
    localStorage.removeItem('auth');
    this.toastr.warning('You have been logged out.');
    this.router.navigate(['/']);
  }
}
