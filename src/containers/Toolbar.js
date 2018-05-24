import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Toolbar extends Component {
  static propTypes = {
    onToggleAddUser: PropTypes.func.isRequired,
    showAddForm: PropTypes.bool.isRequired,
    roleFilter: PropTypes.string.isRequired,
    onSelectRole: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="toolBar">
      <div className="container p-0">
        <div className="row">

          {/* instant search filter */}
          <div className="col-sm-4 form-group">
            <input  type="text"
                    className="form-control"
                    id="query"
                    placeholder="Search"
                    onChange={(event)=>this.props.onSearch(event)}
                    value={this.props.query}
                    autoComplete="off"
            />
          </div>

          {/* Role filter */}
          <div className="col-sm-auto form-group">
            <div className="form-inline">
              <label htmlFor="roleFilter" className="roleLabel text-dark">Role:</label>
              <select id="roleFilter"
                      className="form-control ml-sm-2"
                      value={this.props.roleFilter}
                      onChange={(event)=>this.props.onSelectRole(event)}
              >
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          {/* Toggle Add User form  */}
          <div className="col-sm-auto ml-sm-auto pr-3">
            <div className="form-group">
            {!this.props.showAddForm && (
                <button className="btn btn-info pl-3 pr-3"
                        onClick={() => this.props.onToggleAddUser(true)}
                >
                Add User
                </button>
            )}
            {this.props.showAddForm && (
                <button className="btn btn-secondary pl-4 pr-4"
                        onClick={() => this.props.onToggleAddUser(false)}
                >
                Cancel
                </button>
		        )}
            </div>
          </div>

        </div>
      </div>
      </div>
    )
  }

}

export default Toolbar