import {
  getCondition,
  getConditionWithComposition,
  x,
  s,
  v,
  some
} from "../condition-map";

type Condition = {
  options: string[] | null;
  disabled: boolean;
  expected: boolean;
};

type MockConditions = Record<string, Condition>;

const mockConditions: MockConditions = {
  condition1: {
    options: null,
    disabled: true,
    expected: true
  },
  condition2: {
    options: [],
    disabled: false,
    expected: true
  },
  condition3: {
    options: ["item1", "item2"],
    disabled: true,
    expected: true
  },
  condition4: {
    options: ["item1", "item2"],
    disabled: false,
    expected: false
  }
};

const generateSelectionOptions = (condition: MockConditions) => ({
  noOptions:
    !Array.isArray(condition.options) || condition.options.length === 0,
  isDisabled: !!condition.disabled
});

describe("getCondition", () => {
  test("should return true if at least one condition is true", () => {
    const conditions = {
      a: false,
      b: true,
      c: false
    };
    const result = getCondition(conditions);
    expect(result).toBe(true);
  });

  test("should return false if all conditions are false", () => {
    const conditions = {
      a: false,
      b: false,
      c: false
    };
    const result = getCondition(conditions);
    expect(result).toBe(false);
  });

  test("should return true if all conditions are true", () => {
    const conditions = {
      a: true,
      b: true,
      c: true
    };
    const result = getCondition(conditions);
    expect(result).toBe(true);
  });

  test("should return false if conditions object is empty", () => {
    const conditions = {};
    const result = getCondition(conditions);
    expect(result).toBe(false);
  });

  test("should return false for a large number of false conditions", () => {
    const start = performance.now();
    const conditions = Array(100)
      .fill(false)
      .reduce((acc, _, index) => {
        acc[`key-${index}`] = false;
        return acc;
      }, {});
    const result = getCondition(conditions);
    expect(result).toBe(false);
    const end = performance.now();
    console.log(`Rendering MyComponent took ${end - start} milliseconds`);
  });

  Object.entries(mockConditions).forEach(([conditionName, conditionData]) => {
    const { expected } = conditionData;
    test(`should return ${expected} for ${conditionName}`, () => {
      const conditions = generateSelectionOptions(
        (conditionData as unknown) as MockConditions
      );
      const result = getCondition(conditions);
      expect(result).toEqual(expected);
    });
  });
});

describe("getCondition with composition", () => {
  test("should return true if at least one condition is true", () => {
    const conditions = {
      a: false,
      b: true,
      c: false
    };
    const result = getConditionWithComposition(conditions);
    expect(result).toBe(true);
  });

  test("should return false if all conditions are false", () => {
    const conditions = {
      a: false,
      b: false,
      c: false
    };
    const result = getConditionWithComposition(conditions);
    expect(result).toBe(false);
  });

  test("should return true if all conditions are true", () => {
    const conditions = {
      a: true,
      b: true,
      c: true
    };
    const result = getConditionWithComposition(conditions);
    expect(result).toBe(true);
  });

  test("should return false if conditions object is empty", () => {
    const conditions = {};
    const result = getConditionWithComposition(conditions);
    expect(result).toBe(false);
  });

  test("should return false for a large number of false conditions", () => {
    const conditions = Array(100)
      .fill(false)
      .reduce((acc, _, index) => {
        acc[`key-${index}`] = false;
        return acc;
      }, {});
    const result = getConditionWithComposition(conditions);
    expect(result).toBe(false);
  });

  Object.entries(mockConditions).forEach(([conditionName, conditionData]) => {
    const { expected } = conditionData;
    test(`should return ${expected} for ${conditionName}`, () => {
      const conditions = generateSelectionOptions(
        (conditionData as unknown) as MockConditions
      );
      const result = getConditionWithComposition(conditions);
      expect(result).toEqual(expected);
    });
  });
});

describe("getCondition with curried composition", () => {
  test("should return true if at least one condition is true", () => {
    const conditions = {
      a: false,
      b: true,
      c: false
    };
    const result = x(conditions);
    expect(result).toBe(true);
  });

  test("should return false if all conditions are false", () => {
    const conditions = {
      a: false,
      b: false,
      c: false
    };
    const result = x(conditions);
    expect(result).toBe(false);
  });

  test("should return true if all conditions are true", () => {
    const conditions = {
      a: true,
      b: true,
      c: true
    };
    const result = x(conditions);
    expect(result).toBe(true);
  });

  test("should return false if conditions object is empty", () => {
    const conditions = {};
    const result = x(conditions);
    expect(result).toBe(false);
  });

  test("should return false for a large number of false conditions", () => {
    const conditions = Array(100_100)
      .fill(false)
      .reduce((acc, _, index) => {
        acc[`key-${index}`] = false;
        return acc;
      }, {});
    const result = x(conditions);
    expect(result).toBe(false);
  });

  Object.entries(mockConditions).forEach(([conditionName, conditionData]) => {
    const { expected } = conditionData;
    test(`should return ${expected} for ${conditionName}`, () => {
      const conditions = generateSelectionOptions(
        (conditionData as unknown) as MockConditions
      );
      const result = x(conditions);
      expect(result).toEqual(expected);
    });
  });

  describe("some", () => {
    it("returns a function when provided with a predicate", () => {
      const result = some(Boolean);
      expect(typeof result).toBe("function");
    });

    it("returns true if some elements satisfy the predicate", () => {
      const someTruthy = some(Boolean);
      expect(someTruthy([false, false, true])).toBe(true);
    });

    it("returns false if no elements satisfy the predicate", () => {
      const someTruthy = some(Boolean);
      expect(someTruthy([false, false, false])).toBe(false);
    });
  });
});

describe("values", () => {
  it("returns the values of an object", () => {
    const obj = {
      key1: true,
      key2: false,
      key3: true
    };
    const result = v(obj);
    expect(result).toEqual([true, false, true]);
  });

  it("returns an empty array for an empty object", () => {
    const result = v({});
    expect(result).toEqual([]);
  });
});

describe("some value", () => {
  it("returns true if some elements are truthy", () => {
    expect(s([false, false, true])).toBe(true);
  });

  it("returns false if no elements are truthy", () => {
    expect(s([false, false, false])).toBe(false);
  });

  it("returns false for an empty array", () => {
    expect(s([])).toBe(false);
  });
});
