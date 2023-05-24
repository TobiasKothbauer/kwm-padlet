import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {Padlet} from "../shared/padlet";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})
export class PadletFormComponent implements OnInit{
  padlet = PadletFactory.empty();
  entries: FormArray = new FormArray<any>([]);
  padletForm : FormGroup
  isUpdatingPadlet = false;
  errors: {[key:string]:string} = {}

  constructor (
    private fb: FormBuilder,
    private ps: PadletService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {
    this.padletForm = this.fb.group({});
    this.entries = this.fb.array([]);
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      //edit
      this.isUpdatingPadlet = true;
      this.ps.getSingle(id).subscribe( padlet => {
        this.padlet = padlet;
        this.initPadlet();
      })
    }
    this.initPadlet();
  }

  initPadlet() {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name : [this.padlet.name, Validators.required],
      isPublic: [this.convertIsPublicToNumber(this.padlet.isPublic)],
      entries: this.entries
    });
    this.padletForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    })
  }

  updateErrorMessages(){
    this.errors = {};
    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }

  }

  /*
  addThumbnailControl(){
    this.entries.push(this.fb.group({id:0, title:null, text:null}));
  }
   */

  submitForm() {
    const formValue = this.padletForm.value;
    const isPublic = formValue.isPublic === 'true';

    const padlet: Padlet = {
      ...formValue,
      isPublic: isPublic
    };

    if (this.isUpdatingPadlet) {
      // editieren
      this.ps.updatePadlet(padlet).subscribe(res => {
        this.router.navigate(["../../padlets", padlet.id], { relativeTo: this.route });
      });
    } else {
      // neu anlegen
      const userIdString = sessionStorage.getItem("userId");
      padlet.user_id = userIdString !== null ? parseInt(userIdString) : 0;

      if (this.authService.isLoggedOut()) {
        padlet.isPublic = true;
        padlet.user_id = 3;
        console.log(padlet);
      }

      this.ps.createPadlet(padlet).subscribe(res => {
        this.padlet = PadletFactory.empty();
        this.padletForm.reset(PadletFactory.empty());
        this.router.navigate(["../padlets"], { relativeTo: this.route });
      });
    }
  }

  private convertIsPublicToNumber(isPublic: boolean): number {
    return isPublic ? 1 : 0;
  }


}
