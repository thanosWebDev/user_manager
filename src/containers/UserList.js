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

  // Change back to page one if a filter is aplied
  componentWillReceiveProps(nextProps) {
    const {query, roleFilter} = this.props;
    if (query !== nextProps.query || roleFilter !== nextProps.roleFilter) {
      this.setState({activePage: 1});
    }
  }

  // Filter userlist first by search query and second by user role 
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
        if (username.indexOf(match) !== -1 || 
            first.indexOf(match) !== -1 || 
            last.indexOf(match) !== -1) {
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

  // Filter the users that will be rendered according to pagination
  usersRendering = (usersList) => {
    const {activePage, itemsPerPage} = this.state;
    const start = (activePage * itemsPerPage) - itemsPerPage;
    const end = activePage * itemsPerPage;
    return usersList.slice(start, end);
  }

  // Save active page in state
  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  // Form control and Save items per page in state
  // Set active page to one, when change occurs
  itemsPerPageChange = (event) => {
    this.setState({itemsPerPage: event.target.value, activePage: 1});
  }

  render() {
    const {itemsPerPage, activePage} = this.state;
    const {deleteUser, openModal} = this.props;
    // Filter users first
    const usersList = this.usersFiltering();
    // Slice the users to be rendered according to pagination
    const usersRendered = this.usersRendering(usersList);
    // create index num for each user to be displayed
    const indexStart = (itemsPerPage * activePage) - itemsPerPage;
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
                      deleteUser={deleteUser}
                      openModal={openModal}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={parseInt(itemsPerPage, 10)}
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
                    value={itemsPerPage}
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