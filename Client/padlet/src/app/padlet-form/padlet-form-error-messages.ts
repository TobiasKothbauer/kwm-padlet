export class ErrorMessages {

  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}

}


export const PadletFormErrorMessages = [
  new ErrorMessages('name', 'required', 'Ein Name für das Padlet muss angegeben werden'),
  new ErrorMessages('title', 'required', 'Es muss ein Titel für einen Eintrag angegeben werden'),
  new ErrorMessages('text', 'required', 'Es muss ein Text für einen Eintrag angegeben werden'),
  new ErrorMessages('comment', 'required', 'Es muss ein Text als Kommentar angegeben werden'),
  new ErrorMessages('rating', 'required', 'Es muss eine Zahl zwischen 0 und 5 angegeben werden'),
  /*
  new ErrorMessages('isbn', 'required', 'Es muss eine ISBN angegeben werden'),
  new ErrorMessages('isbn', 'minlength', 'Die ISBN muss mindestens 10 Zeichen enthalten'),
  new ErrorMessages('isbn', 'maxlength', 'Eine ISBN darf höchstens 13 Zeichen haben'),
  new ErrorMessages('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden'),
  new ErrorMessages('authors', 'required', 'Es muss ein Autor angegeben werden'),
  new ErrorMessages('rating', 'min', 'Bewertung kann nur positive Werte annehmen'),
  new ErrorMessages('rating', 'max', 'Maximal 10 Sterne erlaubt')
  */
];
