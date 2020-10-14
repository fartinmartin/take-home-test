import React from "react";
import styles from "./node.module.scss";

const Node = ({ data }) => {
  // expecting object:
  // { key: "name", value: "Tatooine" }

  if (Array.isArray(data.value)) {
    return (
      <details className={styles.node}>
        <summary className={styles.summary}>
          <span className={styles.key}>{data.key}</span>{" "}
          <span className={styles.type}>{"[]"}</span>
          <span className={styles.arrayLength}>{`(${data.value.length})`}</span>
        </summary>
        <ul className={styles.value}>
          {data.value.map((item, index) => (
            <li key={index}>
              <span className={styles.label}>{index}</span>
              {item}
            </li>
          ))}
        </ul>
      </details>
    );
  } else if (typeof data.value === "object") {
    let nodes = [];
    for (const [key, value] of Object.entries(data.value)) {
      nodes.push({ key, value });
    }

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
    return (
      <div className={styles.node}>
        <span className={styles.key}>{data.key}</span>: {data.value}
      </div>
    );
  }
};

export default Node;
