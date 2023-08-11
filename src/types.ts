export type ConditionMap = Record<string, boolean>;

export type ConditionEvaluator = (conditions: ConditionMap) => boolean;

export type PerformanceState = {
  conditionPerformance: number;
  compositionPerformance: number;
  xPerformance: number;
};

export type PerformanceAction =
  | { type: "SET_CONDITION"; payload: number }
  | { type: "SET_COMPOSITION"; payload: number }
  | { type: "SET_X"; payload: number };

export type SpacerProps = {
  as: "div" | "span";
  direction: "horizontal" | "vertical";
  size: number;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ariaLabel?: string;
  style?: React.CSSProperties;
};
