import React, { useEffect } from 'react';
import './Style/RegisterPage&Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

const ResetPassword = () => {

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

    const navigate =useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)    
    const paramsToken  = searchParams.get('token')
    const email = searchParams.get('email')

    const validateToken = async ()=>{
        try {
          // let res = await axios.get('http://localhost:8500/movieticketapi/user/alluserslist')
             let res = await axios.get('https://movie-tickets-application-project-backend.onrender.com/movieticketapi/user/alluserslist')

            if(res.data && res.data.users){
                const reqUser = res.data.find((user)=>user.email===email)
                if(reqUser){
                    const tokenCheck = reqUser.token === paramsToken
                    if(!tokenCheck){
                        console.log('Token is not same')
                    }
                }else{
                    console.log('User not found for email:',email)
                }
            }else{
                console.log('Invalid response data:',res.data)
            }
        } catch (error) {
            console.log('Error Fetching user details:',error)
        }
    }


    // Formik
    const initialValues = {password:'',confirmPassword:''}

    const validationSchema = Yup.object({
        password:Yup.string().min(8).required('Password is Required'),
        confirmPassword:Yup.string().min(8).required('Password is Required')
    })
    const onSubmit  =  async (values) =>{
        try {
           //const res = await axios.put('http://localhost:8500/movieticketapi/user/resetpassword',{...values,email})
             const res = await axios.put('https://movie-tickets-application-project-backend.onrender.com/movieticketapi/user/resetpassword',{...values,email})
            toast.success(res.data.message)
            setTimeout(() => {
                navigate('/')
            }, 500);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
    return (
        <div>
            <img class="wave" src="wave.png" />
            <div class="LoginPagecontainer">
                <div class="img">
                    <img src="reset.svg" />
                </div>
                <div class="login-content">
                    <form onSubmit={formik.handleSubmit}>
                        <img src="avatar.svg" />
                        <h2 class="title">Reset Password</h2>
                        <div class="input-div pass">
                            <div class="i">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div class="div">
                                <h5>Password</h5>
                                <input type="password" class="input" id='password' value={formik.values.password} onChange={formik.handleChange} />
                            </div>
                        </div>
                        <span className="text-danger">{formik.errors.password}</span>

                        <div class="input-div pass">
                            <div class="i">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div class="div">
                                <h5>Confirm Password</h5>
                                <input type="password" class="input" id='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} />
                            </div>
                        </div>
                        <span className="text-danger">{formik.errors.password}</span>
                        <Link to='/'>Back to Login?</Link>
                        {/* <input type="submit" class="button" value="Login" /> */}
                        <button type='Submit' className='button'>Change Password</button>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;