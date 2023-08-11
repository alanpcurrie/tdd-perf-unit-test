import React from "react";
import { render } from "react-dom";
import { PerfTestButtons } from "./PerfTestButtons";
import { perfTest } from "./perf-test";
import { Spacer } from "./Spacer";
import { styles } from "./styles";
const { perfResult } = perfTest();

const App = () => (
  <>
    <div style={styles.container}>
      <Spacer as="div" direction="vertical" size={20} />
      <div style={styles.output}>
        <h1>initial performance Test output: {perfResult} ms </h1>
      </div>
      <Spacer as="div" direction="vertical" size={20} />
      <PerfTestButtons />
      <Spacer as="div" direction="vertical" size={80} />
    </div>
  </>
);

render(<App />, document.getElementById("root"));
