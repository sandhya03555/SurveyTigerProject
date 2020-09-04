import React from "react";
import { Redirect } from "react-router-dom";
const Publish = (props) => {
  let arr = props.location.state.question;
  let op = props.location.state.options;

  const renderTofirst = () => {
    props.history.push("/");
  };
  return (
    <div>
        <h4>{arr}</h4>
        {op.map((v) => (
          <div><input type="checkbox"></input> <a className="text">{v.value}</a></div>
        ))}

      <button onClick={renderTofirst}>Submit</button>
    </div>
  );
};
export default Publish;
