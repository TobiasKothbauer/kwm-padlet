import { Rating } from "./rating";

export class RatingFactory {
  static empty(): Rating {
    return new Rating(
      0,
      0,
      0
    );
  }

  static fromObject(rawRating: any): Rating {
    return new Rating(
      rawRating.id,
      rawRating.rating,
      rawRating.entry_id
    );
  }
}
