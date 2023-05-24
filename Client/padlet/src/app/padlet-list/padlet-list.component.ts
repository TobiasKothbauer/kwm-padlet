import {Component, Inject, OnInit} from '@angular/core';
import {Entry, Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})

export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [] ;
  user: User | undefined;
  userId : number = 0;

  constructor(
    private ps: PadletService,
    public authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private route:ActivatedRoute,
  ) {  }

  ngOnInit() {
    this.ps.getAll().subscribe(
      res => this.padlets = res
    );
    this.userId = this.authService.getCurrentUserId();
    this.ps.getUserById(this.userId).subscribe(
      res => this.user = res
    );
  }

  onPadletClick(event: Event, padlet: any) {
    event.preventDefault(); // Prevent the default navigation behavior

    const currentUserId = this.authService.getCurrentUserId(); // Assuming the user ID is stored in the sessionStorage

    // Check the user's rights for the clicked padlet
    this.ps.getPadletUserRights(padlet.id, currentUserId).subscribe((rights: string | null) => {
      if (rights === 'editieren' || rights === 'lesen' || padlet.user.id == this.authService.getCurrentUserId()) {

        this.router.navigate([padlet.id], {relativeTo: this.route});

      } else {
        // The user does not have the "editieren" right for the padlet
        this.toastr.error('Not allowed', 'Access Denied');
        this.router.navigate(['../padlets'], {relativeTo: this.route});
      }
    });
  }
}
