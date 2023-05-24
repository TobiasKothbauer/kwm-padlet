import {Component, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {User} from "../shared/user";
import {PadletService} from "../shared/padlet.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit{
  user: User | undefined;
  userId = 0;

  constructor(
    private ps: PadletService,
    public authService: AuthenticationService
  ) {  }

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    this.ps.getUserById(this.userId).subscribe(
      res => this.user = res
    );
  }

}
