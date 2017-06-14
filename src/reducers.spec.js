import reducers from "./reducers";

test("@@INIT", () => {
  let state = reducers(undefined, {});
  expect(state).toEqual({ searchTerm: "", omdbData: {} });
});

test("SET_SEARCH_TERM", () => {
  let state = reducers(
    { searchTerm: "", omdbData: {} },
    { type: "SET_SEARCH_TERM", searchTerm: "house" }
  );
  expect(state).toEqual({ searchTerm: "house", omdbData: {} });
});
