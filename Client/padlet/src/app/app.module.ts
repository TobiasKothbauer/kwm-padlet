import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import { PadletListItemComponent } from './padlet-list-item/padlet-list-item.component';
import { PadletDetailsComponent } from './padlet-details/padlet-details.component';
import {PadletService} from "./shared/padlet.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EntryComponent } from './entry/entry.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { PadletFormComponent } from './padlet-form/padlet-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EntryFormComponent } from './entry-form/entry-form.component';
import { CommmentFormComponent } from './commment-form/commment-form.component';
import { Location } from '@angular/common';
import { RatingFormComponent } from './rating-form/rating-form.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailsComponent,
    HomeComponent,
    EntryComponent,
    PadletFormComponent,
    EntryFormComponent,
    CommmentFormComponent,
    RatingFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    PadletService,
    AuthenticationService,
    Location,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'de'
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
