import {Component, OnInit} from '@angular/core';
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {CommentFactory} from "../shared/comment-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../shared/comment";
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
  entryForm : FormGroup
  errors: {[key:string]:string} = {}

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

  ngOnInit(): void {
    this.entryForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    })
  }

  submitForm() {
    const formValue = this.entryForm.value;
    const entry:Entry = EntryFactory.fromObject(formValue);

    console.log(this.route.snapshot.params);
    console.log(entry);
    console.log(formValue);
    //padlet.user_id = 1;
    const padletId = this.route.snapshot.params["padletId"];
    this.ps.createEntry(padletId, entry).subscribe(res => {
      this.entry = EntryFactory.empty();
      this.entryForm.reset(EntryFactory.empty());
      this.router.navigate(["../../../../padlets", padletId], { relativeTo: this.route });
    });
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
