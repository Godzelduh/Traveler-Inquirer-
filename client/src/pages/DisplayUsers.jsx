import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2 className="title is-2">User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="box">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;




