import { Comment } from "./comment";

export class CommentFactory {
  static empty(): Comment {
    return new Comment(
      0,
      "",
      0
    );
  }

  static fromObject(rawComment: any): Comment {
    return new Comment(
      rawComment.id,
      rawComment.comment,
      rawComment.entry_id
    );
  }
}
