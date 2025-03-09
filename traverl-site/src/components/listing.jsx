import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./cssflis/listing.css";
import { useNavigate } from "react-router-dom";
import { Home, AddCircle, AddIcCall, AddToHomeScreen } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";

const Listing = () => {
  const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success"); // "error" or "success"
    const [open, setOpen] = useState(false);
  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpen(true);
  };
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const showData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/listings",{ withCredentials: true });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Ensure UI updates when an error occurs
      }
    };
    showData();
  }, []);

  const redirect = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user", { withCredentials: true });
  
      if (response.status === 200) {
        showAlert("Login successful", "success");
        navigate("/from")
      }
    } catch (error) {
      console.log(error);
  
      if (error.response && error.response.status === 401) {
        showAlert("User is not logged in", "error");
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Redirect to login page after 500ms
      }
    }
  };
  

  const handlechanger = (id) => {
    navigate(`/show/${id}`);
  };

  return (
    <div className="container">
      <div className="btndiv">
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                  <Alert onClose={() => setOpen(false)} severity={alertType}>
                    {alertMessage}
                  </Alert>
                </Snackbar>
        <Button size="small" onClick={redirect} className="btn">
          <Home fontSize="large" color="primary" />
        </Button>
        <Button size="small" onClick={redirect} className="btn">
          <AddIcCall />
        </Button>
        <Button size="small" onClick={redirect} className="btn">
          <AddToHomeScreen />
        </Button>
        <Button size="small" onClick={redirect} className="btn">
          <AddCircle fontSize="large" color="primary" />
        </Button>
      </div>

      {data && data.length ? (
        data.map((item, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }} className="container-item">
            <CardMedia
              component="img"
              alt={item.title || "Image"}
              height="140"
              image={item.image || "/static/images/cards/default.jpg"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {item.title || "Untitled"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.description || "No description available."}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handlechanger(item._id)}>
                View
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default Listing;
