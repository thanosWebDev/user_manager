import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Close from 'react-icons/lib/md/close';

class EditUser  extends Component {
  static propTypes = {
    user: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
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

  componentDidMount() {
    const {user} = this.props;
    this.setState(...user);
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }
  handleInputChangeCheck = (event) => {
    this.setState({enabled: event.target.checked});
  }

  updateUser = (e) => {
    const {username, firstname, lastname} = this.state;
    const { warning, ...updatedUser } = this.state;
    e.preventDefault();
    if (!username || !firstname || !lastname) {
      this.setState({warning: true});
    } else {
      this.props.editUser(updatedUser);
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className="editUserForm">
        <div className="modalHeader">
          <div className="closeBtnModal text-right"><span onClick={this.props.closeModal}><Close /></span></div>
        </div>

        <div className="modalBody">
          <div className="lead pl-3 pr-3 mb-3 text-dark">Edit User</div> 
          <form onSubmit={this.updateUser}>
            <div className="form-group">
              <div className="form-group col-md">
                <input type="text" className="form-control form-control-sm" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}autoComplete="off"></input>
              </div>
              <div className="form-group col-md">
                <input type="text" className="form-control form-control-sm" id="firstName" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleInputChange} autoComplete="off"></input>
              </div>
              <div className="form-group col-md">
                <input type="text" className="form-control form-control-sm" id="lastName" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} autoComplete="off"></input>
              </div>
              <div className="form-group col-md">
                <select id="role" className="form-control form-control-sm" value={this.state.role} onChange={this.handleInputChange} name="role">
                  <option value="" disabled>Role...</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="form-check mb-4 ml-3 mr-3">
                <input className="form-check-input" type="checkbox" id="enabled" name="enabled" checked={this.state.enabled} onChange={this.handleInputChangeCheck}/>
                <label className="form-check-label text-dark" htmlFor="enabled">
                  Enabled
                </label>
              </div>
              <div className="form-group col-md">
              <button type="submit" className="btn btn-success btn-sm btn-block">Save</button>
              </div>
            </div>
            { this.state.warning && (
              <div className="pl-3 pr-3"><small>All fields are required</small></div>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default EditUser