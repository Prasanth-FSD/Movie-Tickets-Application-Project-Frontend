import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Style/TicketBooking.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../App';
const TicketBooking = () => {
    const {setMovieToBook} = useContext(BookingContext)
    const [moviesData, setMoviesData] = useState([])
    const [carouselData, setCarouselData] = useState([])

    const fetchMovieData = async () => {
        try {
           // const res = await axios.get('http://localhost:8500/uploadapi/admin/allmovies')
             const res = await axios.get('https://movie-tickets-application-project-backend.onrender.com/uploadapi/admin/allmovies')
            setMoviesData(res.data.data)
            

        } catch (error) {
            console.log(error)
        }
    }

    const fetchCarouselData = async () => {
        try {
           // const imageRes = await axios.get('http://localhost:8500/uploadapi/admin/allimages')
             const imageRes = await axios.get('https://movie-tickets-application-project-backend.onrender.com/uploadapi/admin/allimages')
           setCarouselData(imageRes.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCarouselData()
        fetchMovieData()

    }, [])
    return (
        <div>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner carouselContainer">
                    {carouselData.map((imageitem, index) => {
                        return (
                            <>
                                <div key={index} class="carousel-item active" data-bs-interval="2000">
                                    <img src={imageitem.image} class="d-block w-100 rounded-5" alt="..." />
                                </div>

                            </>
                        )
                    })}

                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>



            <div className='container cardContainer rounded-5 my-5'>

                <h3 className='pt-4 ms-4'>Movies in Chennai</h3>
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4 mx-3 py-3">
                    {moviesData.map((item, index) => {
                        // console.log("Movie......");
                        // console.log(item);
                        return (
                            <>
                                <div key={index} class="col">
                                    <div class="card h-100">
                                        <img src={item.image} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h6 class="card-title">{item.movietitle}</h6>
                                            <p class="card-text text-secondary">{item.censor}  .  {item.language}</p>
                                        </div>
                                        <div class="card-footer">
                                            {/* <small class="text-body-secondary">Last updated 3 mins ago</small>  */}


                                            {/* new code */}
                                            <Link to={"/theaterSelection"} className='text-center py-2' id='Book' onClick={(e)=>setMovieToBook(item)}>Select Theater</Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default TicketBooking;