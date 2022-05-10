import { Address } from "./address";
import { Post } from "./post";
import { Task } from "./task";

export class User {

    constructor(public _id : string,
                public id : number | null, 
                public name : string, 
                public email : string,
                public address : Address,
                public tasks : Array<Task>,
                public posts : Array<Post>,
                public isSelected : boolean
                ){ }
}
