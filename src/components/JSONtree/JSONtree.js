import React from "react";
import JSONnode from "../JSONnode/JSONnode";
import styles from "./JSONtree.module.scss";

const JSONtree = ({ data }) => {
  // expecting nodes to be an array of objects with two keys ("key" and "value"):
  // nodes = [
  //   { key: "name", value: "Tatooine" },
  //   { key: "my fav numbers", value: [1, 2, 3] },
  //   { key: "best friend", value: { note: "I am a normal unprocessed object" } },
  // ]
  let nodes = [];

  if (Array.isArray(data)) {
    // if json comes in as an array of objects we need to coerce it into our
    // { key: "object", value: {/* an unprocessed object from json array */} } format
    data.forEach((item) =>
      nodes.push({ key: "object", value: item, root: true })
    );
  } else if (typeof data === "object") {
    // if json comes in as an object we need to convert it into an array of objects as in line 7
    for (const [key, value] of Object.entries(data)) {
      nodes.push({ key, value });
    }
  }

  const renderJSONnodes = () => {
    if (!nodes.length) {
      return <span>Give me some data!</span>;
    } else {
      return nodes.map((node, index) => <JSONnode data={node} key={index} />);
    }
  };

  return <div className={styles.tree}>{renderJSONnodes()}</div>;
};

export default JSONtree;
