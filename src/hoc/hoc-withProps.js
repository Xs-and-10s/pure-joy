import { Component, PropTypes } from "react";
import { withProps } from "recompose";
import { connect } from "redux";

const HomeLink = withProps(({ query }) => ({ href: "#/" }))("a");
const ProductsLink = withProps({ href: "#/products" })("a");
const CheckoutLink = withProps({ href: "#/checkout" })("a");

const App = () =>
  <div className="App">
    <header>
      <HomeLink query="logo">Logo</HomeLink>
    </header>
    <nav>
      <HomeLink>Home</HomeLink>
      <ProductsLink>Products</ProductsLink>
      <CheckoutLink>Checkout</CheckoutLink>
    </nav>
  </div>;

ReactDOM.render(<App />, document.getElementById("main"));
