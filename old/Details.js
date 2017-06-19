import React from "react";
import { connect } from "react-redux";

import { func, shape, string } from "prop-types";

import Header from "./Header";
import { getOMDBDetails } from "./actionCreators";

class Details extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   omdbData: {}
    // };
  }

  componentDidMount() {
    if (!this.props.omdbData.imdbRating) {
      this.props.dispatch(getOMDBDetails(this.props.omdbData.imdbID));
    }
  }

  render() {
    const { title, description, year, poster, trailer } = this.props.show;
    let rating;
    if (this.props.omdbData.imdbRating) {
      rating = <h3>{this.props.omdbData.imdbRating}</h3>;
    } else {
      rating = <img src="/public/img/loading.png" alt="loading indicator" />;
    }
    return (
      <div className="details">
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>({year})</h2>
          {rating}
          <img src={`/public/img/posters/${poster}`} />
          <p>{description}</p>
        </section>
        <div>
          <iframe
            src={`https://youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  dispatch: func,
  omdbData: shape({
    imdbID: string
  }),
  show: shape({
    description: string,
    imdbID: string,
    poster: string,
    title: string,
    trailer: string
  })
};

const mapStateToProps = (state, ownProps) => {
  const omdbData = state.omdbData[ownProps.show.imdbID] || {};
  return { omdbData };
};

export const Unwrapped = Details;

export default connect(mapStateToProps)(Details);
