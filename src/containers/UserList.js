import React, { Component } from 'react';
import User from '../components/User';
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';


class UserList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    roleFilter: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
  }

  state = {
    activePage: 1,
    itemsPerPage: "10"
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query
    || this.props.roleFilter !== nextProps.roleFilter) {
      this.setState({activePage: 1});
    }
  }

  usersFiltering = () => {
    const {users, query, roleFilter} = this.props;
    let filteredUsers = users;
    // Search filter
    if (query !== "") {
      filteredUsers = filteredUsers.filter( user => {
        const username = user.username.toLowerCase(),
              first = user.firstname.toLowerCase(),
              last = user.lastname.toLowerCase(),
              match = query.toLowerCase();
        if (username.indexOf(match) !== -1 || first.indexOf(match) !== -1 || last.indexOf(match) !== -1) {
          return true;
        } else {
          return false
        }
      })
    }
    // Role filter
    if (roleFilter === 'all') {
      return filteredUsers;
    } else {
      return filteredUsers.filter(user => user.role === roleFilter);
    }
  }

  usersRendering = (usersList) => {
    const {activePage, itemsPerPage} = this.state;
    const start = (activePage * itemsPerPage) - itemsPerPage;
    const end = activePage * itemsPerPage;
    return usersList.slice(start, end);
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  itemsPerPageChange = (event) => {
    const name = event.target.name;
    this.setState({[name]: event.target.value, activePage: 1});
  }

  render() {
    const usersList = this.usersFiltering();
    const usersRendered = this.usersRendering(usersList);
    const indexStart = (this.state.itemsPerPage * this.state.activePage) - this.state.itemsPerPage;
    return (
      <div className="container userList mt-5">

        <div className="row mb-3">

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">First Name</th>
                <th scope="col">Laste name</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                {usersRendered.map((user, index) => (
                  <User user={user}
                        index={(index+1) + indexStart}
                        key={user.id}
                        deleteUser={this.props.deleteUser}
                        openModal={this.props.openModal}
                  />
                ))}
            </tbody>
          </table>

        </div>

        <div className="row">

          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={parseInt(this.state.itemsPerPage, 10)}
            totalItemsCount={usersList.length}
            onChange={this.handlePageChange}
            linkClass="page-link"
            itemClass="page-item"
            nextPageText="Next"
            prevPageText="Previous"
            innerClass="pagination pagination-sm"
          />

          <div className="ml-auto">
            <select id="itemsPerPage"
                    name="itemsPerPage"
                    className="form-control form-control-sm"
                    value={this.state.itemsPerPage}
                    onChange={this.itemsPerPageChange}
            >
              <option value="5" >5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

        </div>

      </div>
    )
  }

}

export default UserList