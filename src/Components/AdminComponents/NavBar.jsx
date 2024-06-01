import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            setIsLoading(true)
           // const res = await axios.get('http://localhost:8500/movieticketapi/user/logout')
            const res = await axios.get('https://movie-tickets-application-project-backend.onrender.com/movieticketapi/user/logout')
            Cookies.remove('token')
            localStorage.removeItem('email')
            localStorage.removeItem('username')
            toast.success(res.data.message)
            setTimeout(() => {
                navigate('/')
            }, 500);
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('Error while logging out:', error)
        } finally {
            setIsLoading(false)

        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* <Link className="navbar-brand">URL-SHORTENER</Link> */}
                <Link to="/welcome" className="navbar-brand "><img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/tpmc-logo.6a0114d4.png" alt="" className='logo' /></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNavDropdown" >
                    <div className="navbar-nav ms-auto" >
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/admin/*">Users <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/admin/movies">Movies <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/addmoviespanel">Add Movies</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='logout-btn-div mx-3'>
                        <button className='logout-btn text-center btn' style={{ backgroundColor: "rgb(237, 57, 57)" }} onClick={handleLogout}>
                            {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <i className="fas fa-power-off"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;