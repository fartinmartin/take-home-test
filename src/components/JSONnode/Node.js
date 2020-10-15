import React from "react";
import styles from "./node.module.scss";

const Node = ({ data }) => {
  // expecting an object:
  // data = { key: "name", value: "Tatooine" }

  if (Array.isArray(data.value)) {
    // return for arrays
    return (
      <details className={styles.node}>
        <summary className={styles.summary}>
          <span className={styles.key}>{data.key}</span>{" "}
          <span className={styles.type}>{"[]"}</span>
          <span className={styles.arrayLength}>{`(${data.value.length})`}</span>
        </summary>
        <ol className={styles.value} start="0">
          {data.value.map((item, index) => (
            <li key={index}> {item} </li>
          ))}
        </ol>
      </details>
    );
  } else if (typeof data.value === "object" && data.value) {
    let nodes = [];
    for (const [key, value] of Object.entries(data.value)) {
      nodes.push({ key, value });
    }
    // return for objects
    return (
      <details className={styles.node}>
        <summary className={styles.summary}>
          <span className={styles.key}>{data.key}</span>{" "}
          <span className={styles.type}>{"{}"}</span>
        </summary>
        <div className={styles.value}>
          {nodes.map((node, index) => (
            <Node data={node} key={index} />
          ))}
        </div>
      </details>
    );
  } else {
    // return for string, number, boolean, null
    // TODO: conditional classes for each type
    return (
      <div className={styles.node}>
        <span className={styles.key}>{data.key}</span>: {data.value}
      </div>
    );
  }
};

export default Node;
