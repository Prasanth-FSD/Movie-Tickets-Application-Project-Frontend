import  { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //const response = await axios.get('http://localhost:8500/movieticketapi/user/alluserslist');
        const response = await axios.get('https://movie-tickets-application-project-backend.onrender.com/movieticketapi/user/alluserslist');
        console.log(response.data.data)
        setUsers(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-list-container">
      <h2 className="title">User List</h2>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3 className="user-name">{user.username}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
