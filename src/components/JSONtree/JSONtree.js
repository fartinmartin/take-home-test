import React from "react";
import Node from "../JSONnode/Node";
import styles from "./tree.module.scss";

const JSONtree = ({ data }) => {
  // expecting an array of objects:
  // nodes = [
  //   { key: "name", value: "Tatooine" },
  //   { key: "my fav numbers", value: [1, 2, 3] },
  //   { key: "best friend", value: { key: "name", value: "Luke" } },
  // ]
  let nodes = [];

  // TODO:
  // recursively(?) turn response data into nested array of objects
  // ...👇 this only works if data comes in as single object (a la swapi)

  for (const [key, value] of Object.entries(data)) {
    nodes.push({ key, value });
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
