import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { func, object, string } from "prop-types";

import { setSearchTerm } from "./actionCreators";

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }
  handleSearchSubmit(event) {
    event.preventDefault();
    this.context.router.transitionTo("/search");
  }
  handleSearchTermChange(event) {
    // this.props.dispatchSetSearchTerm(event.target.value);
    this.props.dispatch(setSearchTerm(event.target.value));
  }
  render() {
    return (
      <div className="landing">
        <h1>svideo</h1>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={this.props.searchTerm}
            onChange={this.handleSearchTermChange}
          />
        </form>
        {/*{<a>Or browse all</a>} (<HashRouter>)*/}
        <Link to="/search">Or browse all</Link>
      </div>
    );
  }
}

Landing.contextTypes = {
  router: object
};

Landing.propTypes = {
  dispatch: func,
  // dispatchSetSearchTerm: func,
  searchTerm: string
};

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetSearchTerm(searchTerm) {
      dispatch(setSearchTerm(searchTerm));
    }
  };
};

export const Unwrapped = Landing;

// export default connect(mapStateToProps, mapDispatchToProps)(Landing);
export default connect(mapStateToProps)(Landing);
