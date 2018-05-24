import React, { Component } from 'react';
import {getUsers} from '../utils/helper';
import Header from '../components/Header';
import UserList from './UserList';
import AddUserForm from './AddUserForm';
import Toolbar from './Toolbar';
import Modal from 'react-modal';
import EditUser from '../components/EditUser';
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

  componentDidMount() {
    const allUsers = getUsers();
    this.setState({users: allUsers});
  }

  toggleAddUser = bool => this.setState({showAddForm: bool});

  onSelectRole = event => this.setState({roleFilter: event.target.value});

  addUser = (user) => {
    this.setState(state => ({
      users: state.users.concat([user])
    }));
  }

  editUser = (user) => {
    this.setState(state => ({
      users: state.users.map( item => {
        if (item.id === user.id){ return user }
        return item;
      })
    }));
  }

  deleteUser = (id) => {
    this.setState(state => ({
      users: state.users.filter( user => user.id !== id )
    }));
  }

  openModal = (id) => this.setState({ showModal: true, userToBeUpdated: id });
  closeModal = () => this.setState({ showModal: false, userToBeUpdated: "" });

  render() {
    return (
      <div>
        <Header /> 
        <Toolbar  onToggleAddUser={this.toggleAddUser}
                  showAddForm={this.state.showAddForm}
                  roleFilter={this.state.roleFilter}
                  onSelectRole={this.onSelectRole}
                  onSearch={(event) => this.setState({ query: event.target.value })}
                  query={this.state.query}
        
        />
        {this.state.showAddForm && (
		      <AddUserForm  onAddUser={this.addUser}
                        onToggleAddUser={this.toggleAddUser}
          />
		    )}
        <UserList users={this.state.users}
                  deleteUser={this.deleteUser}
                  openModal={this.openModal}
                  roleFilter={this.state.roleFilter}
                  query={this.state.query}
        />

        <Modal
            className="modal-form"
            overlayClassName="overlay"
            isOpen={this.state.showModal}
            onRequestClose={this.closeModal}
            contentLabel="Edit User"
        >
          <EditUser closeModal={this.closeModal}
                    editUser={this.editUser}
                    user={this.state.users.filter(user => user.id===this.state.userToBeUpdated)}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
