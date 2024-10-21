import React from 'react';

const DisplayUsers = () => {

    return (
        <div>
      <h1>Users List</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.username}>
              <td>{user.id}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/">Back to Home</a>
    </div>
    )
}
export default DisplayUsers;