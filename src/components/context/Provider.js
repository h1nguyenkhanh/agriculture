import React from "react";
import Context from "components/context/Context";

function Provider(props) {
  const { value } = props;
  return <Context.Provider value={value}>
      {props.children}
  </Context.Provider>;
}

export default Provider;
