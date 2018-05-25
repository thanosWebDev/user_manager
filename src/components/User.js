import React from 'react'
import PropTypes from 'prop-types'
import {capitalize} from '../utils/helper'

const User = ({user, index, deleteUser, openModal}) => (
  <tr>
    <th scope="row">{index}</th>
    <td>{user.username}</td>
    <td>{capitalize(user.firstname)}</td>
    <td>{capitalize(user.lastname)}</td>
    <td>{capitalize(user.role)}</td>
    <td>{user.enabled ? 'Enabled' : 'Disabled'}</td>
    <td className="actions">
      <span className="editBtn mr-2" onClick={() => openModal(user.id)}>Edit</span>
      <span className="closeBtn" onClick={() => deleteUser(user.id)}>Delete</span>
    </td>
  </tr>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
  openModal: PropTypes.func
}

export default User
