import {Component, OnInit} from '@angular/core';
import {Entry, Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {ToastrService} from "ngx-toastr";
import { Location } from '@angular/common';
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})

export class PadletDetailsComponent implements OnInit{
  padlet : Padlet = PadletFactory.empty();
  entries : Entry[] | undefined;
  users: User[] = [];
  selectedUser: number = 0;
  selectedRights: string = "";

  constructor(
    private ps:PadletService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,
    private location: Location,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {

    const params = this.route.snapshot.params;

    // wir erwarten uns, dass es einen parameter aus der URL gibt, den wir auslesen können
    // von app-routing.module.ts kann ich id auslesen -> {path: 'padlets/:id', component : PadletDetailsComponent}
    this.ps.getSingle(params['id']).subscribe(
      (pad:Padlet) => this.padlet=pad
    );

    this.ps.getAllEntries(params['id']).subscribe(
      (ent:Entry[]) => this.entries=ent
    );

    this.ps.getAllUsers().subscribe(
      (users:User[]) => this.users=users
    );

  }

  updateUserRights(padletId: number, userId: number, right: string) {
    this.ps.setUserRights(this.padlet.id, userId, right).subscribe(
      (res:any) => {
        this.router.navigate(['../padlets/', padletId], {relativeTo: this.route});
        this.toastr.success("Rechte des Padlets wurde aktualisiert", "Rechtevergabe war erfolgreich!");
      })
  }

  removePadlet(){
    if(confirm('Soll das Padlet wirklich gelöscht werden?')){
      this.ps.removePadlet(this.padlet.id).subscribe(
        (res:any) => {
          this.router.navigate(['../'], {relativeTo: this.route});
          this.toastr.success("Padlet wurde erfolgreich gelöscht", "Löschen war erfolgreich!");
        }
      )
    }
  }

  removeEntry(entryId:number) {
    if(confirm('Soll der Eintrag und alle damit verbundenen Kommentare & Ratings wirklich gelöscht werden?')){
      this.ps.removeEntry(entryId).subscribe(
        (res:any) => {
          window.location.reload();
          this.toastr.success("Eintrag wurde erfolgreich gelöscht", "Löschen war erfolgreich!");
        }
      )
    }
  }

  getStars(numStars: number): string {
    let starIcon = '';
    for (let i = 0; i < numStars; i++) {
      starIcon += '<i class="star icon yellow"></i>';
    }
    return starIcon;
  }



}
