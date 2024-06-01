import axios from 'axios';
import { useEffect, useState } from 'react';
import './AdminPanel.css'; // Ensure this is imported to apply the CSS

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);

  // Function to fetch movies
  const fetchMovies = async () => {
    try {
      // Fetch movies from the server
     // const response = await axios.get("http://localhost:8500/uploadapi/admin/allmovies");
      const response = await axios.get("https://movie-tickets-application-project-backend.onrender.com/uploadapi/admin/allmovies");
      const data = await response.data.data;
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movie-management-container">
      <h2>Movie Management</h2>
      <button onClick={fetchMovies}>List Movies</button>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li className="movie-item" key={movie.id}>
            {movie.movietitle} - {movie.genre} - {movie.language}
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieManagement;
