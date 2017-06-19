import { Component, PropTypes } from "react";
import { compose, mapProps } from "recompose";
import { connect } from "redux";

const { string } = PropTypes;

const STATUS_is_ACTIVE = "active";
const STATUS_is_INACTIVE = "inactive";
const STATUS_is_PENDING = "pending";

const configPromise = fetchConfiguration();

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
