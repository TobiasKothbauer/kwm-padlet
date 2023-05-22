import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./shared/authentication.service";

@Injectable()
export class CanCommentAndRateGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      window.alert(
        "Sie müssen Sich einloggen, um den Administrationsbereich zu betreten"
      );
      console.log(state);
      this.router.navigate(["../"], { relativeTo: this.route });
      return false;
    }
  }
}
