import React from 'react';
import auth from '../utils/auth';

/**
 * @typedef {Object} UserData
 * @property {number} id - The user's ID.
 * @property {string} username - The user's username.
 * @property {string} email - The user's email.
 */

/**
 * @typedef {Object} UserListProps
 * @property {UserData[] | null} users - Users can be an array of UserData objects or null.
 */

/**
 * UserList component.
 * @param {UserListProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const UserList = ({ users }) => {
    return (
        <>
            <h2 className="pb-5">
                Check out all your friends!
            </h2>
            {users && users.map((user) => (
                <div className="row align-center mb-5" key={user.id}>
                    <div className="col-md-6">
                        <h3>{user.id}. {user.username}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4><a href={`mailto:${user.email}`}>{user.email}</a></h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserList;