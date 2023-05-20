import { Injectable } from '@angular/core';
import {Entry, Padlet} from "./padlet";
import {PadletListComponent} from "../padlet-list/padlet-list.component";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

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

  removePadlet(id:number) : Observable<any>  {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

}
