import { getCondition } from "./condition-map";

export const perfTest = () => {
  const start = performance.now();
  const conditions = Array(10_000)
    .fill(false)
    .reduce((acc, _, index) => {
      acc[`key-${index}`] = false;
      return acc;
    }, {});
  getCondition(conditions);

  const end = performance.now();
  return {
    perfResult: end - start
  };
};
