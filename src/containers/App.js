import React, { Component } from 'react';
import {getUsers} from '../utils/helper';
import Header from '../components/Header';
import UserList from './UserList';
import AddUserForm from './AddUserForm';
import Toolbar from '../components/Toolbar';
import Modal from 'react-modal';
import EditUser from './EditUser';
import '../css/App.css';

class App extends Component {

  state = {
    users: [],
    showAddForm: false,
    showModal: false,
    userToBeUpdated: "",
    roleFilter: "all",
    query: ""
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  // Populate state with data
  componentDidMount() {
    const allUsers = getUsers();
    this.setState({users: allUsers});
  }

  // Toogle Add user form
  toggleAddUser = bool => this.setState({showAddForm: bool});
  // Save role selection filter in state
  onSelectRole = event => this.setState({roleFilter: event.target.value});

  // Add a new user
  addUser = (user) => {
    this.setState(state => ({
      users: state.users.concat([user])
    }));
    // Possible API call to save user in the db
  }

  // Update a user's details
  editUser = (user) => {
    this.setState(state => ({
      users: state.users.map( item => {
        if (item.id === user.id){ return user }
        return item;
      })
    }));
    // Possible API call to update user in the db
  }

  // Delete a user
  deleteUser = (id) => {
    this.setState(state => ({
      users: state.users.filter( user => user.id !== id )
    }));
    // Possible API call to delete user in the db
  }

  // Modal handling and save in state the user's id to be updated with modal form
  openModal = (id) => this.setState({ showModal: true, userToBeUpdated: id });
  closeModal = () => this.setState({ showModal: false, userToBeUpdated: "" });

  render() {
    const { showAddForm,
            roleFilter,
            query,
            users,
            showModal,
            userToBeUpdated} = this.state;
    return (
      <div>
        <Header /> 
        <Toolbar  onToggleAddUser={this.toggleAddUser}
                  showAddForm={showAddForm}
                  roleFilter={roleFilter}
                  onSelectRole={this.onSelectRole}
                  onSearch={(event) => this.setState({ query: event.target.value })}
                  query={query}
        
        />
        {showAddForm && (
		      <AddUserForm  onAddUser={this.addUser}
                        onToggleAddUser={this.toggleAddUser}
          />
		    )}
        <UserList users={users}
                  deleteUser={this.deleteUser}
                  openModal={this.openModal}
                  roleFilter={roleFilter}
                  query={query}
        />
        <Modal
            className="modal-form"
            overlayClassName="overlay"
            isOpen={showModal}
            onRequestClose={this.closeModal}
            contentLabel="Update User"
        >
          <EditUser closeModal={this.closeModal}
                    editUser={this.editUser}
                    user={users.filter(user => user.id === userToBeUpdated)}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
