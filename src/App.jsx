import  { createContext, useEffect, useState } from 'react';
import RegisterPage from './Components/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import WelcomePage from './Components/WelcomePage';
import Navbar from './Components/Navbar';
import TicketBooking from './Components/TicketBooking';
import './App.css'
import TheaterSelection from './Components/TheaterSelection';
import AdminPanel from './Components/AdminComponents/AdminPanel';
import Seatings from './Components/Seatings';


const BookingContext = createContext();


const App = () => {
  // new code
  const [movieToBook, setMovieToBook] = useState("");
  const [theaterToBook, setTheaterToBook] = useState("");
  const [timeToBook, setTimeTOBook] = useState("");
  const [dateToBook, setDateToBook] = useState("")
  const [seatNumberToBook, setSeatNumberToBook] =useState("")
  const [bookingDetails, setBookingDetails] = useState("")
  ///

  const [email, setEmail] = useState(localStorage.getItem('email') || "")
  const [username, setUsername] = useState(localStorage.getItem('username' || ""))
  const [token, setToken] = useState(localStorage.getItem('token') || "")
 
  useEffect(() => {
    localStorage.setItem('email', email)
    localStorage.setItem('username', username)
    localStorage.setItem('token', token)
  }, [email, username])
  return (
    <div>
      {/* new code */}
      <BookingContext.Provider value ={{
        email,
        movieToBook,
        setMovieToBook, 
        theaterToBook, 
        setTheaterToBook, 
        timeToBook, 
        setTimeTOBook, 
        dateToBook, 
        setDateToBook, 
        seatNumberToBook, 
        setSeatNumberToBook,
        bookingDetails, 
        setBookingDetails
       }}>
      <BrowserRouter>
        <Routes>
          <Route path='/admin/*' element={<AdminPanel />} />
          <Route path='/Register' element={<RegisterPage />} />
          <Route path='/' element={<LoginPage setEmail={setEmail} setUsername={setUsername} />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path='/resetpasword' element={<ResetPassword />} />
          <Route path='/welcome' element={<><Navbar /><WelcomePage username={username} email={email}/></>}/>
          <Route path='/ticketbooking/:email' element={<><Navbar /><TicketBooking /></>} />
          <Route path="/theaterSelection" element={<><Navbar /><TheaterSelection /></>}/>
          <Route path='/seatSelection' element={<><Navbar/><Seatings/></>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      </BookingContext.Provider>
    </div>
  );
};

export {App as default, BookingContext};