import {Entry} from "./entry";
import {User} from "./user";
export {Entry} from "./entry";

export class Padlet {
  public constructor(
    public id:number,
    public name:string,
    public isPublic:boolean,
    public creation_date:Date,
    public user_id:number,
    public entries: Entry[],
    public user: User,
  ) {
  }
}
