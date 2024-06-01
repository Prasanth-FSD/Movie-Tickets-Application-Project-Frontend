import { useEffect } from 'react';
import './Style/RegisterPage&Login.css'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import axios from 'axios';
const LoginPage = ({setUsername,setEmail,email}) => {

    useEffect(() => {
        const inputs = document.querySelectorAll(".input");

        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            inputs.forEach(input => {
                input.removeEventListener("focus", addcl);
                input.removeEventListener("blur", remcl);
            });
        };
    }, []); // Empty dependency array to run the effect only once when the component mounts

    const navigate = useNavigate()
    

    // formik
    const initialValues ={email:'',password:''}

    const validationSchema = Yup.object({
        email:Yup.string().email('Invalid email address').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email address').required('Email is Required'),
        password:Yup.string().min(8).required('Password is Required')
    })

    const onSubmit = async (values) =>{
        try {
          // const res  = await axios.post('http://localhost:8500/movieticketapi/user/login',values)
             const res  = await axios.post('https://movie-tickets-application-project-backend.onrender.com/movieticketapi/user/login',values)
            setUsername(res.data.data.username)
            console.log(res.data.data)
            setEmail(values.email)
            toast.success(res.data.message)
            Cookies.set('token',res.data.token)
            if(res.data.data.role ==="Admin"){
                setTimeout(() => {
                    navigate(`/admin/*`)
                }, 1000);
            }
            else{
                setTimeout(() => {
                    navigate(`/welcome/`)
                }, 1000);
            }
        } catch (error) {
            toast.error(error.response.data.message);

        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
    return (
        <div>
            <img className="wave" src="wave.png" />
            <div className="LoginPagecontainer">
                <div className="img">
                    <img src="login.svg" />
                </div>
                <div className="login-content">
                    <form onSubmit={formik.handleSubmit}>
                        <img src="avatar.svg" />
                        <h2 className="title">Welcome Back</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="div">
                                <h5>Email</h5>
                                <input type="email" className="input" id='email' value={formik.values.email} onChange={formik.handleChange} />
                            </div>
                        </div>
                        <span className="text-danger">{formik.errors.email}</span>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <h5>Password</h5>
                                <input type="password" className="input" id='password' value={formik.values.password} onChange={formik.handleChange}/>
                            </div>
                        </div>
                        <span className="text-danger">{formik.errors.password}</span>
                        {/* <a href="#">Forgot Password?</a> */}
                        <Link to='/forgot' >Forgot Password?</Link>
                        {/* <input type="submit" className="button" value="Login" /> */}
                        <button type='submit' className='button'>Login</button>
                      <Link to='/register'>New user?</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;