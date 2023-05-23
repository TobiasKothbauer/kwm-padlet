import { Injectable } from '@angular/core';
import {Entry, Padlet} from "./padlet";
import {Comment} from "./comment";
import {PadletListComponent} from "../padlet-list/padlet-list.component";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {Rating} from "./rating";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class PadletService {
  /*
  padlets : Padlet [];

  constructor() {
    this.padlets = [
      new Padlet(1,
        'erstes Padlet',
        true,
        new Date(2014, 5, 29),
        1,
        [new Entry(1,'neuer eintrag', 'eintrag zum padlet 1', 1),
          new Entry(1,'neuer eintrag2', '2. eintrag zum padlet 1', 1)],
      ),
      new Padlet(2,
        'zweites Padlet',
        false,
        new Date(2014, 5, 29),
        1,
        [new Entry(1,'neuer eintrag', 'eintrag zum padlet 2', 2),
          new Entry(1,'neuer eintrag2', '2. eintrag zum padlet 2', 2)],
      )
    ];
  }
  */
  private api = 'http://padlet.s2010456017.student.kwmhgb.at/api';

  constructor(private http:HttpClient) {}

  /**
   * GET
   */
  getAll(): Observable<Array<Padlet>> {
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:number) : Observable<Padlet>  {
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllEntries(id:number) : Observable<Array<Entry>> {
    return this.http.get<Array<Entry>>(`${this.api}/padlets/${id}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getEntryById(id:number) : Observable<Entry>  {
    return this.http.get<Entry>(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUserById(id:number) : Observable<User> {
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  /**
   * DELETE
   */
  removePadlet(id:number) : Observable<any>  {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  removeEntry(id:number) : Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  /**
   * POST
   */
  createPadlet(padlet:Padlet) : Observable<any>  {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createEntry(padletId:number, entry:Entry) {
    return this.http.post(`${this.api}/padlets/${padletId}/entries`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createComment(entryId:number, comment:Comment) : Observable<any> {
    return this.http.post(`${this.api}/entries/${entryId}/comments`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createRating(entryId:number, rating:Rating) : Observable<any> {
    return this.http.post(`${this.api}/entries/${entryId}/ratings`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  /**
   * PUT
   */
  updatePadlet(padlet:Padlet) : Observable<any>  {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  updateEntry(entry:Entry) : Observable<any>  {
    return this.http.put(`${this.api}/entries/${entry.id}`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  /**
   * ERROR
   */
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }


}
