import axios from 'axios';
import React, { useState } from 'react';
import "./cssflis/form.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Snackbar } from '@mui/material';

const SignUP = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpen(true);
  };

  const submitData = async (data) => {
    console.log("Form Data:", data);
    // const email = data.email;

    // try {
    //     const response = await axios.get(`http://localhost:8080/checkEmail?email=${email}`);
        
    //     if (response.data.exists) { // Assuming API returns { exists: true/false }
    //         showAlert("Email already exists!", "error");
    //         return;
    //     }
    // } catch (error) {
    //     console.error("Error checking email:", error);
    //     showAlert(error.response?.data?.message || "Error checking email. Try again!", "error");
    //     return;
    // }

    try {
        const response = await axios.post("http://localhost:8080/signup", data,{withCredentials:true});
        
        if (response.data.error) {
            showAlert(response.data.error, "error");
            return;
        }
        
        
        navigate("/login");
    } catch (error) {
        console.error("Signup error:", error);
        showAlert(error.response?.data?.message || "Signup failed. Try again!", "error");
    }
  };

  return (
    <div className='container'>
       <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(submitData)} className='container-item'>

        <div className="inputbox">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            placeholder='Enter username' 
            {...register("username", { required: "Username is required" })} 
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div className="inputbox">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            placeholder='Enter email' 
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          
        </div>

        <div className="inputbox">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            placeholder='Enter password' 
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 6, message: "Password must be at least 6 characters" } 
            })} 
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="hover-button">Submit</button>
      </form>
    </div>
  );
};

export default SignUP;
