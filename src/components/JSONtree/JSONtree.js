import React from "react";
import Node from "../JSONnode/Node";
import styles from "./tree.module.scss";

const JSONtree = ({ data }) => {
  // expecting nodes to be an array of objects:
  // nodes = [
  //   { key: "name", value: "Tatooine" },
  //   { key: "my fav numbers", value: [1, 2, 3] },
  //   { key: "best friend", value: { key: "name", value: "Luke" } },
  //   { key: "object", value: {/* an object from json array */} },
  // ]
  let nodes = [];

  if (Array.isArray(data)) {
    // if json comes in as an array of objects we need to coerce it into our format
    data.forEach((item) => nodes.push({ key: "object", value: item }));
  } else {
    // if json comes in as an object we need to convert it into an array of objects
    for (const [key, value] of Object.entries(data)) {
      nodes.push({ key, value });
    }
  }

  return (
    <div className={styles.tree}>
      {!nodes.length ? (
        <span>Give me some data!</span>
      ) : (
        nodes.map((node, index) => <Node data={node} key={index} />)
      )}
    </div>
  );
};

export default JSONtree;
