import {Comment} from "./comment";
import {Rating} from "./rating";
export {Comment} from"./comment";
export {Rating} from"./rating";

export class Entry {
  constructor(
    public id:number,
    public title:string,
    public text:string,
    public padlet_id:number,
    public comments: Comment[],
    public ratings: Rating[],
  ) {
  }
}
