import { Component, PropTypes } from "react";
import { compose, setDisplayName, setPropTypes } from "recompose";
import { connect } from "redux";

const enhance = compose(
  setDisplayName("User"),
  setPropTypes({
    name: string.isRequired,
    status: string
  }),
  connect()
);
