import React from 'react';

import UserList from '../components/UserList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Sap',
      image: 'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
      places: 2
    }
  ];
  return <UserList items={USERS} />;
};

export default Users;
