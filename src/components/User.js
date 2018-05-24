import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {capitalize} from '../utils/helper';

class User  extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteUser: PropTypes.func.isRequired,
    openModal: PropTypes.func
  }

  state = {
    btnOpacity: 0.4,
    edit: false
  }

  showButtons = (scale) => {
    this.setState({btnOpacity: scale})
  }

  render() {
    const {user, index, deleteUser, openModal} = this.props;
    return (
      <tr onMouseOver={()=>this.showButtons(1)} onMouseLeave={()=>this.showButtons(0.4)}>
        <th scope="row">{index}</th>
        <td>{user.username}</td>
        <td>{capitalize(user.firstname)}</td>
        <td>{capitalize(user.lastname)}</td>
        <td>{capitalize(user.role)}</td>
        <td>{user.enabled ? 'Enabled' : 'Disabled'}</td>
        <td className="actions" style={{opacity: this.state.btnOpacity}}>
          <span className="editBtn mr-2" onClick={()=>openModal(user.id)}>Edit</span>
          <span className="closeBtn" onClick={()=>deleteUser(user.id)}>Delete</span>
        </td>
      </tr>
    )
  }
}

export default User