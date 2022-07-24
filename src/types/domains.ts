import { ObjectIdLike } from './mongoose';

export namespace domains {
  export interface Entity {
    _id: ObjectIdLike;
  }
}
