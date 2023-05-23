import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {EntryComponent} from "./entry/entry.component";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {CommmentFormComponent} from "./commment-form/commment-form.component";
import {RatingFormComponent} from "./rating-form/rating-form.component";
import {LoginComponent} from "./login/login.component";
import {CanCommentAndRateGuard} from "./can-comment-and-rate.guard";

const routes: Routes = [
  // pathMatch: 'full' -> it must match the entire slug, and nothing should come after it
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'padlets', component: PadletListComponent },
  { path: 'padlets/:id', component: PadletDetailsComponent },
  { path: 'admin', component: PadletFormComponent },
  { path: 'admin/:id', component: PadletFormComponent },
  { path: 'admin/padlets/:padletId/entries', component: EntryFormComponent },
  { path: 'admin/padlets/:padletId/entries/:entryId', component: EntryFormComponent },
  { path: 'admin/padlets/:padletId/entries/:entryId/comment', component: CommmentFormComponent, canActivate:[CanCommentAndRateGuard] },
  { path: 'admin/padlets/:padletId/entries/:entryId/rating', component: RatingFormComponent, canActivate:[CanCommentAndRateGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanCommentAndRateGuard]
})

export class AppRoutingModule { }
