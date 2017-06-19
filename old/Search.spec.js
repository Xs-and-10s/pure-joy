import React from "react";
import { Provider } from "react-redux";
// import renderer from "react-test-renderer";
import { render, shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import preload from "../public/data.json";
import store from "./store";
import { setSearchTerm } from "./actionCreators";

import Search, { Unwrapped as UnwrappedSearch } from "./Search";
import ShowCard from "./ShowCard";

test("Search component barebones snapshot test", () => {
  const component = renderer.create(
    <UnwrappedSearch shows={preload.shows} searchTerm="" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Search component enzyme snapshot test", () => {
  const component = shallow(
    <UnwrappedSearch shows={preload.shows} searchTerm="" />
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test("expect a ShowCard for each show", () => {
  const component = shallow(
    <UnwrappedSearch shows={preload.shows} searchTerm="" />
  );
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test("should render proper number based on search", () => {
  const searchTerm = "house";

  store.dispatch(setSearchTerm(searchTerm));
  const component = render(
    <Provider><Search shows={preload.shows} /></Provider>
  );
  // const component = shallow(
  //   <UnwrappedSearch shows={preload.shows} searchTerm="" />
  // );
  // component.find("input").simulate("change", { target: { value: searchTerm } });

  const showCount = preload.shows.filter(
    show =>
      `${show.title} ${show.description}`
        .toUpperCase()
        .indexOf(searchTerm.toUpperCase()) >= 0
  ).length;

  expect(component.find(".show-card").length).toEqual(showCount);
  // expect(component.find(ShowCard).length).toEqual(showCount);
});
