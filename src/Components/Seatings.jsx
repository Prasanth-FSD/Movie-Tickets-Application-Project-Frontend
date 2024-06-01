import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../App";
import { toast } from "react-toastify";

const Seatings = () => {
    const { email, bookingDetails } = useContext(BookingContext);
    const [seatingArray, setSeatingArray] = useState([...Array(30).fill("Not Booked")]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            let { theaterName, date, movieName, time } = bookingDetails;
            let res = await axios.get("https://movie-tickets-application-project-backend.onrender.com/bookings/getAllBookings", {
                params: {
                    email,
                    theaterName,
                    date,
                    movieName,
                    time
                }
            });

            if (res.data.data !== "No Bookings") {
                const updatedSeatingArray = [...seatingArray];
                for (let key in res.data.data) {
                    key = parseInt(key);
                    updatedSeatingArray[key - 1] = "Booked";
                }
                setSeatingArray(updatedSeatingArray);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleSeatSelect = (index) => {
        const updatedSelectedSeats = [...selectedSeats];
        if (updatedSelectedSeats.includes(index + 1)) {
            updatedSelectedSeats.splice(updatedSelectedSeats.indexOf(index + 1), 1);
        } else {
            updatedSelectedSeats.push(index + 1);
        }
        setSelectedSeats(updatedSelectedSeats);
    };

    const handleBooking = async () => {
        try {
            let { theaterName, date, movieName, time } = bookingDetails;
            let resp = await axios.post("https://movie-tickets-application-project-backend.onrender.com/bookings/updateBookings", {
                email,
                theaterName,
                date,
                movieName,
                time,
                seatNumbers: selectedSeats
            });
            if (resp.data.message === "Booked Successfully") {
                toast.success(resp.data.message);
                fetchBookings(); // Refetch bookings to update the UI
                setSelectedSeats([]); // Clear selected seats after booking
            } else {
                toast.error(resp.response.statusText);
            }
        } catch (error) {
            // console.error("Error booking ticket:", error);
            toast.error(error.response.data.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {seatingArray.map((seat, index) => (
                    <div style={{ padding: "5px", borderRadius: "4px", margin: "15px", border: "1px solid black" }} key={index}>
                        <p>{`Seat no: ${index + 1}`}</p>
                        {seat === "Booked" ? (
                            <p style={{ color: "red" }}>Booked</p>
                        ) : (
                            <button
                                style={{ backgroundColor: selectedSeats.includes(index + 1) ? "green" : "#535bf2", color: "black" }}
                                onClick={() => handleSeatSelect(index)}
                            >
                                {selectedSeats.includes(index + 1) ? "Selected" : "Select"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {selectedSeats.length > 0 && (
                <button
                    style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#535bf2", color: "white", borderRadius: "5px", border: "none", cursor: "pointer" }}
                    onClick={handleBooking}
                >
                    Confirm Booking
                </button>
            )}
        </div>
    );
};

export default Seatings;
