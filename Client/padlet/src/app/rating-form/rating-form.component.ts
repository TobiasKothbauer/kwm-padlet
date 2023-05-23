import {Component, OnInit} from '@angular/core';
import {CommentFactory} from "../shared/comment-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../shared/comment";
import {EntryFactory} from "../shared/entry-factory";
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {RatingFactory} from "../shared/rating-factory";
import {Rating} from "../shared/rating";

@Component({
  selector: 'bs-rating-form',
  templateUrl: './rating-form.component.html',
  styles: [
  ]
})
export class RatingFormComponent implements OnInit{
  rating = RatingFactory.empty();
  ratingForm : FormGroup;
  errors: {[key:string]:string} = {};
  padletId: number = 0;


  constructor (
    private fb: FormBuilder,
    private ps: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ratingForm = this.fb.group({
      id: 0,
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]], // Define the 'comment' form control
      entry_id: this.route.snapshot.params["entryId"]
    });

  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.padletId = params['padletId'];
    console.log(this.padletId);
    this.ratingForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    })
  }

  submitForm() {
    const formValue = this.ratingForm.value;
    const rating:Rating = RatingFactory.fromObject(formValue);

    console.log(this.ratingForm.value);
    //padlet.user_id = 1;
    const entryId = this.route.snapshot.params["entryId"];
    const padletId = this.route.snapshot.params["padletId"];
    this.ps.createRating(entryId, rating).subscribe(res => {
      this.rating = RatingFactory.empty();
      this.ratingForm.reset(RatingFactory.empty());
      this.router.navigate(["../../../../../../padlets", padletId], { relativeTo: this.route });
    });
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of PadletFormErrorMessages) {
      const control = this.ratingForm.get(message.forControl);
      if (control && control.dirty && control.invalid && control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  increaseRating() {
    const ratingControl = this.ratingForm.get('rating');
    if (ratingControl?.value < 5) {
      ratingControl?.setValue(ratingControl?.value + 1);
    }
  }

  decreaseRating() {
    const ratingControl = this.ratingForm.get('rating');
    if (ratingControl?.value > 0) {
      ratingControl?.setValue(ratingControl?.value - 1);
    }
  }

}
