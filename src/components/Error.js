import React from "react";

const Error = (props) => {
  return (
    <div>
      <span>We had an error.</span>
      <pre>{props.error}</pre>
    </div>
  );
};

export default Error;
