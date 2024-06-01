import React from 'react';
import './Style/WelcomePage.css'
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({username,email}) => {
    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate(`/ticketbooking/${email}`)
    }
    return (
        <div>
            <div className='text-center textContainer'>
               <h2 class="welcome-username" >Hello {username} !</h2>
               <p className='card-text my-3'>Welcome to Movie Ticket Booking Web Application</p>
               <p>Click here to Book Movie Tickets</p>
               <button className='btn btn-warning' onClick={handleClick}>Book Tickets  <i class="fas fa-arrow-right mx-2"></i></button>
            </div>

            <img class='welcomeWave' src="/wave.svg" alt="" />

        </div>
    );
};

export default WelcomePage;