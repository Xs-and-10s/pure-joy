import { Component, PropTypes } from "react";
import {
  compose,
  lifecycle,
  mapProps,
  setDisplayName,
  setPropTypes,
  withProps,
  withState,
  withHandlers,
  withReducer
} from "recompose";
import { connect } from "redux";

const { string } = PropTypes;

const STATUS_is_ACTIVE = "active";
const STATUS_is_INACTIVE = "inactive";
const STATUS_is_PENDING = "pending";

const configPromise = fetchConfiguration();

const StatusList = props => {
  return (
    <div className="StatusList">
      <div>pending</div>
      <div>active</div>
      <div>inactive</div>
    </div>
  );
};

const enhance = compose(
  setDisplayName("User"),
  setPropTypes({
    name: string.isRequired,
    status: string
  }),
  connect()
);

const withToggleState = compose(
  withState("toggledOn", "toggle", false),
  withHandlers({
    show: ({ toggle }) => e => toggle(true),
    hide: ({ toggle }) => e => toggle(false),
    toggle: ({ toggle }) => e => toggle(current => !current)
  })
);

const withToggle = compose(
  withState(
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

const withConfig = lifecycle({
  componentDidMount() {
    configPromise.then(config =>
      this.setState(
        (
          prevState,
          props => {
            return { config };
          }
        )
      )
    );
  }
});

const Status = withToggle(({ status, toggledOn, setListVisible }) => {
  return (
    <span onClick={toggle}>
      {status}
      {toggledOn && <StatusList />}
    </span>
  );
});

const Tooltip = withToggle(({ text, children, toggledOn, show, hide }) =>
  <span>
    {toggledOn && <div className="Tooltip">{text}</div>}
    <span onMouseEnter={show} onMouseLeave={hide}>{children}</span>
  </span>
);

const User = enhance((name, status) => {
  return (
    <div className="User" onClick={() => dispatch({ type: "USER_SELECTED" })}>
      {name}: {status}
    </div>
  );
});

const UserList = ({ users, status }) =>
  <div className="UserList">
    <h3>{status} users</h3>
    {users && users.map(user => <User {...user} />)}
  </div>;

const users = [
  { name: "Tim", status: STATUS_is_ACTIVE },
  { name: "Bob", status: STATUS_is_ACTIVE },
  { name: "Joe", status: STATUS_is_ACTIVE },
  { name: "Jim", status: STATUS_is_INACTIVE }
];

const filterByStatus = status =>
  mapProps(({ users }) => ({
    status,
    users: users.filter(u => u.status === status)
  }));

const ActiveUsers = filterByStatus(STATUS_is_ACTIVE)(UserList);
const InactiveUsers = filterByStatus(STATUS_is_INACTIVE)(UserList);
const PendingUsers = filterByStatus(STATUS_is_PENDING)(UserList);

const App = () =>
  <div className="App">
    <ActiveUsers users={users} />
    <InactiveUsers users={users} />
    <PendingUsers users={users} />
  </div>;

ReactDOM.render(<App />, document.getElementById("main"));
