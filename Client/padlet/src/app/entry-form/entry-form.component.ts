import {Component, OnInit} from '@angular/core';
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {EntryFactory} from "../shared/entry-factory";
import {Entry} from "../shared/entry";

@Component({
  selector: 'bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [
  ]
})
export class EntryFormComponent implements OnInit{
  entry = EntryFactory.empty();
  entryForm : FormGroup;
  errors: {[key:string]:string} = {};
  isUpdatingEntry = false;

  constructor (
    private fb: FormBuilder,
    private ps: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      text: ['', Validators.required],
      padlet_id: this.route.snapshot.params["padletId"]
    });

  }

  /*
  ngOnInit(): void {
    this.entryForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    })
  }
   */

  ngOnInit(): void {
    const entryId = this.route.snapshot.params["entryId"];
    if (entryId) {
      //edit
      this.isUpdatingEntry = true;
      this.ps.getEntryById(entryId).subscribe( entry => {
        this.entry = entry;
        this.initEntry();
      })
    }
    this.initEntry();
  }

  initEntry() {
    this.entryForm = this.fb.group({
      id: this.entry.id,
      title : [this.entry.title, Validators.required],
      text: [this.entry.text, Validators.required],
      padlet_id : this.route.snapshot.params["padletId"]
    });
    this.entryForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    })
  }


  submitForm() {
    const entry: Entry = this.entryForm.value;
    const padletId = this.route.snapshot.params["padletId"];

    if (this.isUpdatingEntry) {
      // editieren
      this.ps.updateEntry(entry).subscribe(res => {
        this.router.navigate(["../../../../../padlets", padletId], { relativeTo: this.route });
      });
    } else {

      const formValue = this.entryForm.value;
      const entry:Entry = EntryFactory.fromObject(formValue);

      //padlet.user_id = 1;
      this.ps.createEntry(padletId, entry).subscribe(res => {
        this.entry = EntryFactory.empty();
        this.entryForm.reset(EntryFactory.empty());
        this.router.navigate(["../../../../padlets", padletId], { relativeTo: this.route });
      });

    }
  }


  updateErrorMessages() {
    this.errors = {};
    for (const message of PadletFormErrorMessages) {
      const control = this.entryForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
