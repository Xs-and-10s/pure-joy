import React, { Component } from "react";
import { connect } from "react-redux";

import { arrayOf, shape, string } from "prop-types";

import Header from "./Header";
import ShowCard from "./ShowCard.jsx";

class Search extends Component {
  render() {
    {
      /** this is a comment */
    }
    return (
      <div className="search">
        <Header showSearch />
        <div>
          {this.props.shows
            .filter(
              show =>
                `${show.title} ${show.description}`
                  .toUpperCase()
                  .indexOf(this.props.searchTerm.toUpperCase()) >= 0
            )
            .map(show => {
              return <ShowCard key={show.imdbID} {...show} />;
            })}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchTerm: string,
  shows: arrayOf(
    shape({
      description: string,
      title: string
    })
  )
};

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm
  };
};

export const Unwrapped = Search;

export default connect(mapStateToProps)(Search);
