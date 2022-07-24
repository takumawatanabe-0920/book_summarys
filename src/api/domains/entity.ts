import { ObjectId } from 'mongodb';

import { UpdateBody, isObjectId } from '../../types/mongoose';
import { domains } from '../../types/domains';

abstract class Entity<T extends domains.Entity> {
  private __id: domains.Entity['_id'];
  private _isNew: boolean;

  protected props: Partial<T>;

  /**
   * @deprecated remove when cut the dependency of mongodb
   */
  protected updateBody: UpdateBody<T>;

  constructor(props: Partial<T>) {
    this.props = props;
    this.updateBody = {
      $set: {},
      $unset: {},
      $push: {},
      $pull: {},
    };

    if (props._id) {
      this.__id = props._id;
      this._isNew = false;
    } else {
      this.__id = new ObjectId();
      this._isNew = true;
      this.props._id = this._id;
    }
  }

  get _id() {
    return this.__id;
  }
  isNew() {
    return this._isNew;
  }
  getData() {
    return this.props;
  }
  getUpdateBody() {
    return this.updateBody;
  }

  protected set<K extends keyof T>(key: K, value: T[K]) {
    this.props[key] = value;
    this.updateBody.$set[key] = value;
  }
  protected unset<K extends keyof T>(key: K) {
    this.props[key] = undefined;
    this.updateBody.$unset[key] = true;
  }

  protected push<K extends keyof T>(
    key: K,
    ...values: T[K] extends Array<infer V> ? Array<V> : never
  ) {
    // TODO: add type
    const newValues: any = this.props[key] || [];
    newValues.push(...values);
    this.props[key] = newValues;

    const newPush = this.updateBody.$push[key] || [];
    newPush.push(...values);
    this.updateBody.$push[key] = newPush;
  }

  protected addToSet<K extends keyof T>(
    key: K,
    ...values: T[K] extends Array<infer V> ? Array<V> : never
  ) {
    // TODO: add type
    const newValues: any = this.props[key] || [];
    const added = values.filter(
      (v1) => !newValues.some((v2) => compareEntity(v1, v2)),
    );
    newValues.push(...added);
    this.props[key] = newValues;

    this.updateBody.$set[key] = newValues.map((v) => getEntityId(v));
  }

  protected pull<K extends keyof T>(
    key: K,
    ...values: T[K] extends Array<infer V> ? Array<V> : never
  ) {
    // TODO: add type
    const curr: any = this.props[key] || [];
    const newValues = curr.filter(
      (v1) => !values.some((v2) => compareEntity(v1, v2)),
    );
    this.props[key] = newValues;

    this.updateBody.$set[key] = newValues.map((v) => getEntityId(v));
  }

  public equals(v) {
    return compareEntity(this, v);
  }
}

const compareEntity = (e1, e2) => getEntityId(e1) === getEntityId(e2);
const getEntityId = (e) => {
  let v = e._id?.toString() || e;
  if (v instanceof Buffer) {
    v = v.toString('hex');
  }
  return isObjectId(String(v)) ? String(v) : v;
};

export { compareEntity, Entity };
