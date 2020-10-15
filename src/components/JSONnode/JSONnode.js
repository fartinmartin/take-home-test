import React from "react";
import styles from "./JSONnode.module.scss";

const JSONnode = ({ data }) => {
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
            <JSONnode data={node} key={index} />
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

export default JSONnode;

// import React from "react";
// import styles from "./node.module.scss";

// const ArrayJSONnode = (data) => (
//   // return for arrays
//   <details className={styles.node}>
//     <summary className={styles.summary}>
//       <span className={styles.key}>{data.key}</span>{" "}
//       <span className={styles.type}>{"[]"}</span>
//       <span className={styles.arrayLength}>{`(${data.value.length})`}</span>
//     </summary>
//     <ol className={styles.value} start="0">
//       {data.value.map((item, index) => (
//         <li key={index}> {item} </li>
//       ))}
//     </ol>
//   </details>
// );

// const ObjectJSONnode = (data) => {
//   // return for objects
//   let nodes = [];
//   for (const [key, value] of Object.entries(data.value)) {
//     nodes.push({ key, value });
//   }
//   return (
//     <details className={styles.node}>
//       <summary className={styles.summary}>
//         <span className={styles.key}>{data.key}</span>{" "}
//         <span className={styles.type}>{"{}"}</span>
//       </summary>
//       <div className={styles.value}>
//         {nodes.map((node, index) => (
//           <JSONnode data={node} key={index} />
//         ))}
//       </div>
//     </details>
//   );
// };

// const OtherJSONnode = (data) => {
//   // return for string, number, boolean, null
//   // TODO: conditional classes for each type
//   return (
//     <div className={styles.node}>
//       <span className={styles.key}>{data.key}</span>: {data.value}
//     </div>
//   );
// };

// const JSONnode = ({ data }) => {
//   // expecting an object:
//   // data = { key: "name", value: "Tatooine" }

//   if (Array.isArray(data.value)) {
//     return <ArrayJSONnode data={data} />;
//   } else if (typeof data.value === "object") {
//     return <ObjectJSONnode data={data} />;
//   } else {
//     return <OtherJSONnode data={data} />;
//   }
// };

// export default JSONnode;
