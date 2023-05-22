import {Component, Inject, OnInit} from '@angular/core';
import {Entry, Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})

export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [] ;

  constructor(
    private ps: PadletService,
    public authService: AuthenticationService
  ) {  }

  ngOnInit() {
    this.ps.getAll().subscribe(
      res => this.padlets = res
    );
  }
}
