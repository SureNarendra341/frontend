import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Age: {user.age}</p>
      {/* <p>Profession: {user.profession}</p> */}
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;