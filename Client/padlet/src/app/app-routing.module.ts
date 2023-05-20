import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {EntryComponent} from "./entry/entry.component";

const routes: Routes = [
  // pathMatch: 'full' -> es muss tatsächlich die ganze slug matchen und es darf nichts danach kommen
  {path: '', redirectTo : 'home', pathMatch: 'full'},
  {path: 'home', component : HomeComponent},
  {path: 'padlets', component : PadletListComponent},
  {path: 'padlets/:id', component : PadletDetailsComponent},
  {path: 'padlets/:id/entries', component : EntryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
