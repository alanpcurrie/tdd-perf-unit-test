import React, { useReducer } from "react";
import {
  getCondition,
  getConditionWithComposition,
  x as getConditionWithCurriedComposition
} from "./condition-map";
import { Spacer } from "./Spacer";
import { Button } from "./Button";
import type {
  PerformanceAction,
  PerformanceState,
  ConditionEvaluator
} from "./types";
import { styles } from "./styles";

const ACTION_TO_STATE_MAP: Record<
  PerformanceAction["type"],
  keyof PerformanceState
> = {
  SET_CONDITION: "conditionPerformance",
  SET_COMPOSITION: "compositionPerformance",
  SET_X: "xPerformance"
};

const performanceReducer = (
  state: PerformanceState,
  action: PerformanceAction
): PerformanceState => {
  const stateKey = ACTION_TO_STATE_MAP[action.type];
  return { ...state, [stateKey]: action.payload };
};

const perfTest = (cb: ConditionEvaluator) => {
  const start = performance.now();
  const conditions = Array(10_000_00)
    .fill(false)
    .reduce((acc, _, index) => {
      acc[`key-${index}`] = false;
      return acc;
    }, {});
  cb(conditions);
  const end = performance.now();
  return end - start;
};

export const PerfTestButtons = () => {
  const [state, dispatch] = useReducer(performanceReducer, {
    conditionPerformance: 0,
    compositionPerformance: 0,
    xPerformance: 0
  });

  return (
    <>
      <Button
        ariaLabel="Click to perform set condition"
        onClick={() =>
          dispatch({ type: "SET_CONDITION", payload: perfTest(getCondition) })
        }
      >
        Test getCondition
      </Button>

      <div style={styles.output}>
        Performance for getCondition: {state.conditionPerformance} milliseconds
      </div>

      <Spacer as="div" direction="vertical" size={20} />

      <Button
        ariaLabel="Click to perform set composition"
        onClick={() =>
          dispatch({
            type: "SET_COMPOSITION",
            payload: perfTest(getConditionWithComposition)
          })
        }
      >
        Test getConditionWithComposition
      </Button>

      <div style={styles.output}>
        Performance for getConditionWithComposition:{" "}
        {state.compositionPerformance} milliseconds
      </div>

      <Spacer as="div" direction="vertical" size={20} />

      <Button
        ariaLabel="Click to perform set curried composition"
        onClick={() =>
          dispatch({
            type: "SET_X",
            payload: perfTest(getConditionWithCurriedComposition)
          })
        }
      >
        Test getConditionWithCurriedComposition
      </Button>
      <div style={styles.output}>
        Performance for getConditionWithCurriedComposition: {state.xPerformance}{" "}
        milliseconds
      </div>
    </>
  );
};
