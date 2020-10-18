import React from "react";
import styles from "./JSONnode.module.scss";

const JSONnode = ({ data }) => {
  // expecting an object:
  // data = { key: "name", value: "Tatooine" }

  if (Array.isArray(data.value)) {
    return <ArrayJSONnode data={data} open={data.root} />;
  } else if (data.value && typeof data.value === "object") {
    return <ObjectJSONnode data={data} open={data.root} />;
  } else {
    return <OtherJSONnode data={data} />;
  }
};

const ArrayJSONnode = ({ data, open }) => (
  // return for arrays
  <details className={`${styles.node} ${styles.typeArray}`} open={open}>
    <summary className={styles.summary}>
      <span className={styles.key}>{data.key}</span>:{" "}
      <span className={styles.typeHint}>
        {"[]"}
        <span className={styles.length}>{`(${data.value.length})`}</span>
      </span>
    </summary>
    <ol className={styles.value} start="0">
      {data.value.map((item, index) => (
        <li key={index} className={styles.arrayItem}>
          {item}
        </li>
      ))}
    </ol>
  </details>
);

const ObjectJSONnode = ({ data, open }) => {
  // return for objects
  let nodes = [];
  const valueAsArray = Object.entries(data.value);
  for (const [key, value] of valueAsArray) {
    nodes.push({ key, value });
  }
  return (
    <details className={`${styles.node} ${styles.typeObject}`} open={open}>
      <summary className={styles.summary}>
        <span className={styles.key}>{data.key}</span>:{" "}
        <span className={styles.typeHint}>
          {"{}"}
          <span className={styles.length}>{`(${valueAsArray.length})`}</span>
        </span>
      </summary>
      <div className={styles.value}>
        {nodes.map((node, index) => (
          <JSONnode data={node} key={index} />
        ))}
      </div>
    </details>
  );
};

const OtherJSONnode = ({ data }) => {
  // return for string, number, boolean, null, Date
  // TODO: conditional classes for each type
  return (
    <details className={`${styles.node} ${styles.typeOther}`}>
      <summary className={styles.summary}>
        <span className={styles.key}>{data.key}</span>:
        <span className={styles.value}>{data.value}</span>
      </summary>
    </details>
  );
};

export default JSONnode;
