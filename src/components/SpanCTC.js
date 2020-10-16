import React, { useRef } from "react";

const SpanCTC = (props) => {
  const spanRef = useRef(null);
  return (
    <span {...props} ref={spanRef}>
      {props.children}
    </span>
  );
};

export default SpanCTC;
