import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000000",
    fontFamily: "Courier New, Courier, monospace"
  },
  output: {
    color: "#00FF00",
    fontSize: "18px",
    border: "1px solid #00FF00",
    padding: "10px",
    width: "80%",
    textAlign: "center",
    backgroundColor: "#001100"
  }
};
