import { ConditionMap } from "./types";

// eslint enforced refactor
// const isDisabled = () => {
//   return !!(
//       !Array.isArray(props.options) ||
//       props.disabled ||
//       props.options.length === 0 ||
//       false
//   );
// };

// version 1 - original refactor
export const getCondition = (conditions: ConditionMap): boolean => {
  return Object.values(conditions).some((condition) => condition);
};

// version 2: refactored for better composition
const values = (obj: ConditionMap) => Object.values(obj);
const getValue = (arr: boolean[]) => arr.some(Boolean);

export const getConditionWithComposition = (
  conditions: ConditionMap
): boolean => getValue(values(conditions));

// version 3: refactored for curried composition
export const v = (o: ConditionMap) => values(o);
export const some = (cb: (value: boolean) => boolean) => (arr: boolean[]) =>
  arr.some(cb);
export const s = some(Boolean);
export const x = (c: ConditionMap): boolean => s(v(c));
