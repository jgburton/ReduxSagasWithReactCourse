import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { getUsersRequest, createUserRequest } from './redux/actions/users';
import UsersList from './components/UsersList';
import NewUserForm from './components/NewUserForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    // console.log(firstName, lastName);
    this.props.createUserRequest({
      firstName,
      lastName
    });
  }

  render() {
    const users = this.props.users;
    return (
      <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList users={users.items} />
      </div>
    );
  }

}

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest
})(App);
