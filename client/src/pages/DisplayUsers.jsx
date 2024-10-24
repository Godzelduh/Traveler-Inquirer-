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
  <section className="section">
    <div className="container">
      <h2 className="title is-1">User List Provided Here</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="box">{user.username}</li>
        ))}
      </ul>
    </div>
  </section>
</div>
  );
};

export default DisplayUsers;




