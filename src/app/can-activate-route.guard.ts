import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(
    public authService: AuthenticationService,
    public routerService: RouterService
  ) { }
  // User Authentication
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.getBearerToken() !== null) {
      const booleanPromise = this.authService.isUserAuthenticated(this.authService.getBearerToken());
      return booleanPromise.then((authenticated) => {
        if (!authenticated) { // For negative case to login
          this.routerService.routeToLogin();
        }
        authenticated = true;
        return authenticated;
      });
    }
    this.routerService.routeToLogin(); // For negative case to login
  }
}
