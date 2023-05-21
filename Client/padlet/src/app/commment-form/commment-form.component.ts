import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentFactory} from "../shared/comment-factory";
import {Comment} from "../shared/comment";
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {EntryFactory} from "../shared/entry-factory";

@Component({
  selector: 'bs-commment-form',
  templateUrl: './commment-form.component.html',
  styles: [
  ]
})
export class CommmentFormComponent implements OnInit{
  comment = CommentFactory.empty();
  commentForm : FormGroup;
  errors: {[key:string]:string} = {}

  constructor (
    private fb: FormBuilder,
    private ps: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.commentForm = this.fb.group({
      id: 0,
      comment: ['', Validators.required], // Define the 'comment' form control
      entry_id: this.route.snapshot.params["entryId"]
    });

  }

  ngOnInit(): void {
    this.commentForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    })
  }

  submitForm() {
    const formValue = this.commentForm.value;
    const comment:Comment = CommentFactory.fromObject(formValue);

    console.log(this.route.snapshot.params);
    console.log(comment);
    console.log(formValue);
    //padlet.user_id = 1;
    const entryId = this.route.snapshot.params["entryId"];
    const padletId = this.route.snapshot.params["padletId"];
    this.ps.createComment(entryId, comment).subscribe(res => {
      this.comment = CommentFactory.empty();
      this.commentForm.reset(CommentFactory.empty());
      this.router.navigate(["../../../../../../padlets", padletId], { relativeTo: this.route });
    });
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of PadletFormErrorMessages) {
      const control = this.commentForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }


}
