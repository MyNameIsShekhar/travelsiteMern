import axios from "axios";
import React, { useState } from "react";
import "./cssflis/form.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Snackbar } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // "error" or "success"
  const [open, setOpen] = useState(false); // Controls Snackbar visibility
  const [loading, setLoading] = useState(false); // Added state for loading button

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to show alert
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpen(true);
  };

  // Form submission handler
  const submitData = async (data) => {


    try {
      const res=await axios.post("http://localhost:8080/loginn", data);
   if(res.data.user){
    showAlert("login successfully")
    navigate("/listings")
   }
 
    
    } catch (error) {
      console.log("Error submitting data:",error);
      showAlert("username or passowrd is incorrect")
    }
  
  };
  

  return (
    <div>
      <div className="container">
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit(submitData)} className="container-item">
          {/* Email */}
          <div className="inputbox">
            <label htmlFor="username">Email</label>
            <input
            name="username"
              type="text"
              placeholder="Enter username"
              autoComplete="username"
              {...register("username", { required: "username is required" })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="inputbox">
            <label htmlFor="password">Password</label>
            <input
            name="password"
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="hover-button" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
