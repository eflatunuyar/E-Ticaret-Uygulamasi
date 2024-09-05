import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../comp_css/AdminUserDetails.css'; 
import api from '../Router/api';

function AdminUserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/ecom/customers/get-all-customer')
      .then((response) => {
        // Sort addresses for each user by timestamp in descending order
        const sortedUsers = response.data.map((user) => ({
          ...user,
          address: user.address.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
        }));
        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Function to get the latest address for a user
  const getLatestAddress = (user) => {
    const addresses = user.address;
    if (addresses && addresses.length > 0) {
      const latestAddress = addresses[0];
      return (
        <div>
          <h3>Adres</h3>
          <p>Kapı Numarası: {latestAddress.flatNo}</p>
          <p>Sokak: {latestAddress.street}</p>
          <p>Şehir: {latestAddress.city}</p>
          <p>Durum: {latestAddress.state}</p>
          <p>Adres Kodu: {latestAddress.zipCode}</p>
        </div>
      );
    } else {
      return <p>Adres Bulunamadı</p>;
    }
  };

  return (
    <div className="admin-users">
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user.userId}>
            <div className="user-info">
              <h3>Kullanıcı Detayı</h3>
              <p>Kullanıcı ID: {user.userId}</p>
              <p>Kullanıcı Ad: {user.email}</p>
              <p>Ad: {user.firstName} {user.lastName}</p>
              <p>Telefon Numarası: {user.phoneNumber}</p>
              <p>Kayıt Tarihi: {user.registerTime}</p>
              <p>Kullanıcı Hesap Durumu: {user.userAccountStatus}</p>
            </div>
            <div className="user-address">
              {getLatestAddress(user)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminUserDetails;
