import React from "react";

import { object } from "prop-types";

class AsyncRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }
  componentDidMount() {
    this.props.loadingPromise.then(module => {
      this.component = module;
      this.setState((prevState, props) => {
        return { loaded: true };
      });
    });
  }
  render() {
    if (this.state.loaded) {
      return <this.component {...this.props.props} />;
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

AsyncRoute.propTypes = {
  loadingPromise: object,
  props: object
};

export default AsyncRoute;
