import { Component } from '@angular/core';
import {Padlet} from "./shared/padlet";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})



export class AppComponent {
  constructor(public authService: AuthenticationService) { }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }
}
