import { Padlet } from "./padlet";
import { Entry } from "./entry";
import { User } from "./user";

export class PadletFactory {
  static empty(): Padlet {
    return new Padlet(
      0,
      "",
      true,
      new Date(),
      0,
      [new Entry(0, "", "", 0, [], [])],
      new User(0, "", "", "", "", "", "", "")
    );
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.isPublic,
      typeof rawPadlet.creation_date === "string"
        ? new Date(rawPadlet.creation_date)
        : rawPadlet.creation_date,
      rawPadlet.user_id,
      rawPadlet.entries,
      rawPadlet.user
    );
  }
}
