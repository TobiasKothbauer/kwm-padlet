import {Entry, Rating, Comment} from "./entry";

export class EntryFactory {
  static empty(): Entry {
    return new Entry(
      0,
      "",
      "",
      0,
      [new Comment(0, "",  0)],
      [new Rating(0, 0,  0)]
    );
  }

  static fromObject(rawEntry: any): Entry {
    return new Entry(
      rawEntry.id,
      rawEntry.title,
      rawEntry.text,
      rawEntry.padlet_id,
      rawEntry.comments,
      rawEntry.ratings
    );
  }
}
