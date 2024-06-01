import React, { useContext, useState } from 'react';
import { BookingContext } from '../App';
import './Style/TicketBooking.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Style/TimeToggle.css"
import { useNavigate } from 'react-router-dom';

const TheaterSelection = () => {
    const { email, movieToBook, setTheaterToBook, setBookingDetails } = useContext(BookingContext);
    const theatersList = movieToBook.theater;
    const navigate = useNavigate();

    const handelBooking = async (values) => {
        try {
           //let resp = await axios.post("http://localhost:8500/bookings/updateBookings", values);
             let resp = await axios.post("https://movie-tickets-application-project-backend.onrender.com/bookings/updateBookings", values);
            (resp.data.message === "Booked Successfully") ? toast.success(resp.data.message) : toast.error(resp.response.statusText);
            // console.log(resp);
        } catch (error) {
            console.error("Error booking ticket:", error);
            toast.error(error.response.data.message);
        }
    };

    const handelTheater = (values, item) => {
        const bookingValues = {
            email: email,
            movieName: movieToBook.movietitle,
            theaterName: item.theatername,
            date: values.date,
            time: values.time,
            // seatNumbers: [Number(values.seatNumber)]
        };
        setTheaterToBook(item.theatername);
        setBookingDetails(bookingValues);
        navigate("/seatSelection")
        //handelBooking(bookingValues);
    };

    const validationSchema = Yup.object().shape({
        date: Yup.string().required('Date is required'),
        // seatNumber: Yup.string().required('Seat number is required'),
        time: Yup.string().required('Time is required'),
    });

    // Function to get date string in YYYY-MM-DD format
    const getDateString = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Get today's date
    const today = new Date();
    
    // Calculate the next five dates starting from today
    const nextFiveDates = [...Array(5)].map((_, index) => {
        const date = new Date(today);
        date.setDate(date.getDate() + index);
        return getDateString(date);
    });

    // Set the min and max attributes for the date picker
    const minDate = nextFiveDates[0];
    const maxDate = nextFiveDates[nextFiveDates.length - 1];
    return (
        <div className='container cardContainer rounded-5 my-5'>
            <h3 className='pt-4 ms-4'>{movieToBook.movietitle} is Screening on</h3>
            <div className="row row-cols-1 g-4 mx-3 py-3">
                {theatersList.map((item, index) => (
                    <div key={index} className="col">
                        <div className="card h-100">
                            <Formik
                                initialValues={{ date: '', time: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    handelTheater(values, item);
                                }}
                            >
                                {({ setFieldValue, values }) => (
                                    <Form style={{ width: "100%" }}>
                                        <div className="card-body d-flex justify-content-between">
                                            <div>
                                                <h6 className="card-title">{item.theatername}</h6>
                                                <div className='time-selection d-flex justify-content-between'>
                                                    <p className="card-text text-secondary">Theater Amenities  {item.theateramenties.join(", ")}</p>
                                                </div>
                                                <div  style={{ marginTop: "1.5rem" }}>
                                                    <label htmlFor="datePicker">Select a date:</label>
                                                    <Field
                                                        type="date"
                                                        name="date"
                                                        id="datePicker"
                                                        min={minDate}
                                                        max={maxDate}
                                                    />
                                                    <ErrorMessage name="date" component="div" className="error-message" />
                                                </div>
                                                {/* <div className='d-block my-3'>
                                                    <label htmlFor="seatSelection">Select Seat Number:</label>
                                                    <Field as="select" name="seatNumber" id="seatSelection">
                                                        <option value="">Select a seat</option>
                                                        {[...Array(100).keys()].map((number) => (
                                                            <option key={number + 1} value={number + 1}>{number + 1}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="seatNumber" component="div" className="error-message" />
                                                </div> */}

                                            </div>
                                            <div style={{ width: "50%" }}>
                                                {item.screentimings.map((time, timeIndex) => (
                                                    <button
                                                        type="button"
                                                        className={`time-button ${values.time === time ? 'selected' : ''}`}
                                                        onClick={() => setFieldValue('time', time)}
                                                        key={timeIndex}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                                <ErrorMessage name="time" component="div" className="error-message" />
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-center">
                                            <button type="submit" style={{ border: "none", background: "none", width: "100%", padding: "5px" }} className='text-center py-2' id='Book'>Select Seats</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TheaterSelection;
