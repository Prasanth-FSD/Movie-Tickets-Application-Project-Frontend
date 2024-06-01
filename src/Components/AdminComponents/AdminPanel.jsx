import "./AdminPanel.css"; // Import CSS file for styling
import AddMovies from "./AddMovies";
import Navbar from "./NavBar";
import MovieManagement from "./MovieManagement";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./UserList";

const MovieContext = createContext();

const AdminPanel = () => {
  
  const[movieId , setMovieId] = useState("");
  return (
    <div> {/* Add a parent element */}
        <MovieContext.Provider value={{movieId,setMovieId}}>
        <Navbar />
        <Routes>
          <Route path="*" element={<UserList/>} />
          <Route path="movies" element={<MovieManagement/>} />
          <Route path="addmoviespanel" element={<AddMovies />} />
          {/* <Route path="" element={} /> */}
        </Routes>
        </MovieContext.Provider>
    </div>
  );
};

export {AdminPanel as default, MovieContext};

