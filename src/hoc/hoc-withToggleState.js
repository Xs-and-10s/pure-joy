import { Component, PropTypes } from "react";
import { compose, withState, withHandlers } from "recompose";

const withToggleState = compose(
  withState("toggledOn", "toggle", false),
  withHandlers({
    show: ({ toggle }) => e => toggle(true),
    hide: ({ toggle }) => e => toggle(false),
    toggle: ({ toggle }) => e => toggle(current => !current)
  })
);
