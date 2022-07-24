import { ObjectId } from 'mongodb';
const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
export function isObjectId(target) {
  return checkForHexRegExp.test(target);
}
type Weaken<T> = {
  [K in keyof T]: any;
};
export type UpdateSet<T> = Partial<T>;
export type UpdateUnset<T> = {
  [K in keyof T]?: boolean;
};
export type UpdatePush<T> = Partial<
  Weaken<{
    [K in keyof T]: T[K] extends (infer R)[] ? R : never;
  }>
>;
export type UpdatePull<T> = Partial<
  Weaken<{
    [K in keyof T]: T[K] extends (infer R)[] ? R : never;
  }>
>;
export type UpdateInc<T> = Partial<
  Weaken<{
    [K in keyof T]: T[K] extends number ? number : never;
  }>
>;
export type ObjectIdLike<T = ObjectId> = T | string | any;
export interface UpdateBody<T> {
  $set?: UpdateSet<T>;
  $unset?: UpdateUnset<T>;
  $push?: UpdatePush<T>;
  $pull?: UpdatePull<T>;
  $inc?: UpdateInc<T>;
}
