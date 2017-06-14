import { Component, PropTypes } from "react";
import { compose, withHandlers, withReducer } from "recompose";
import { connect } from "redux";

const withToggleAction = compose(
  withReducer(
    "toggledOn",
    "dispatch",
    (state, action) => {
      switch (action.type) {
        case "SHOW":
          return true;
        case "HIDE":
          return false;
        case "TOGGLE":
          return !state;
        default:
          return state;
      }
    },
    false
  ),
  withHandlers({
    show: ({ dispatch }) => e => dispatch({ type: "SHOW" }),
    hide: ({ dispatch }) => e => dispatch({ type: "HIDE" }),
    toggle: ({ dispatch }) => e => dispatch({ type: "TOGGLE" })
  })
);

const Status = withToggleAction(({ status, toggledOn, setListVisible }) => {
  return (
    <span onClick={toggle}>
      {status}
      {toggledOn && <StatusList />}
    </span>
  );
});

const Tooltip = withToggleAction(({ text, children, toggledOn, show, hide }) =>
  <span>
    {toggledOn && <div className="Tooltip">{text}</div>}
    <span onMouseEnter={show} onMouseLeave={hide}>{children}</span>
  </span>
);
