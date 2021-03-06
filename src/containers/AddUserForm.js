import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

class AddUserForm extends Component {

  static propTypes = {
    onAddUser: PropTypes.func.isRequired,
    onToggleAddUser: PropTypes.func.isRequired,
  }

  state = {
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    role: "",
    enabled: true,
    warning: false
  }

  // Create a uuid for the new user
  componentDidMount() {
    this.setState({id: uuidv4()});
  }

  // Save user and simple validation if the fields are empty
  saveUser = (e) => {
    const {onAddUser, onToggleAddUser} = this.props;
    const {username, firstname, lastname, role} = this.state;
    const { warning, ...newUser } = this.state;
    e.preventDefault();
    if (!username || !firstname || !lastname || !role) {
      this.setState({warning: true});
    } else {
      onAddUser(newUser);
      onToggleAddUser(false);
    }
  }

  // Input handle of the form
  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }
  handleInputChangeCheck = (event) => {
    this.setState({enabled: event.target.checked});
  }

  render() {
    const {username, firstname, lastname, role, enabled, warning} = this.state;
    return (
        <div className="addUserForm container mt-4 rounded">
          <form onSubmit={this.saveUser}>
            <div className="form-row">
              <div className="form-group col-md">
                <input  type="text"
                        className="form-control form-control-sm"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={this.handleInputChange}
                        autoComplete="off">
                </input>
              </div>
              <div className="form-group col-md">
                <input  type="text"
                        className="form-control form-control-sm"
                        id="firstName"
                        placeholder="First Name"
                        name="firstname"
                        value={firstname}
                        onChange={this.handleInputChange}
                        autoComplete="off">
                </input>
              </div>
              <div className="form-group col-md">
                <input  type="text"
                        className="form-control form-control-sm"
                        id="lastName"
                        placeholder="Last Name"
                        name="lastname"
                        value={lastname}
                        onChange={this.handleInputChange}
                        autoComplete="off">
                </input>
              </div>
              <div className="form-group col-md-auto">
                <select id="role" 
                        className="form-control form-control-sm"
                        value={role}
                        onChange={this.handleInputChange}
                        name="role">
                  <option value="" disabled>Role...</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="form-check col-md-auto mb-3 mb-md-0 mt-md-1 ml-4">
                <input  className="form-check-input"
                        type="checkbox"
                        id="enabled"
                        name="enabled"
                        checked={enabled}
                        onChange={this.handleInputChangeCheck}/>
                <label className="form-check-label" htmlFor="enabled">
                  Enabled
                </label>
              </div>
              <div className="form-group col-md-auto ml-md-5">
                <button type="submit"
                        className="btn btn-success btn-sm pl-5 pr-5 pl-md-3 pr-md-3">
                  Save
                </button>
              </div>
            </div>
            { warning && (
              <div className="mb-2"><small>All fields are required</small></div>
            )}
          </form>
        </div>
    );
  }
}

export default AddUserForm;
