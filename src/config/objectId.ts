const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
export function isObjectId(target) {
  return checkForHexRegExp.test(target);
}
export type GetIdInput = { _id: any } | { id: any } | string | Buffer | any;
function is_id(target): target is { _id: any } {
  return !!target?._id;
}
function isid(target): target is { id: any } {
  return !!target?.id;
}
// get objectId string
export function getId(target: GetIdInput) {
  let value = is_id(target) ? target._id : isid(target) ? target.id : target;
  if (typeof Buffer !== 'undefined') {
    value = value instanceof Buffer ? value.toString('hex') : value;
  }
  const id = isObjectId(String(value)) ? String(value) : null;

  return id;
}

export function getIdList(target) {
  return target?.map?.(getId).filter((t) => !!t) || [];
}
