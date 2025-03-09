import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./cssflis/show.css";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


const Show = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/listings/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Submit Review Form
  const reviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      comment: reviewText,
    };

    try {
      await axios.post(`http://localhost:8080/listings/${id}/reviews`, reviewData);
      console.log("Review submitted successfully!");

      // Reset form fields
      setRating(0);
      setReviewText("");

      // Fetch updated reviews
      const response = await axios.get(`http://localhost:8080/listings/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Delete Listing
  const deleteListing = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/listings/${id}`);
      console.log("Listing deleted successfully!");
      navigate("/listings");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (!data) return <p>Loading...</p>;

  const reviews = data.reviews || [];

  return (
    
    <div className="main-show">
      <h1>{data.title}</h1>
      <div className="container-show">
        {data.image && <img src={data.image} alt={data.title || "Listing Image"} />}
      </div>

      <div className="container-text">
        
        <p>
          <b>Price:</b> {data.price}
        </p>
        <p>{data.description}</p>
        <p>
          <b>Location:</b> {data.location}
        </p>
        <p>
          <b>Country:</b> {data.country}
        </p>
      </div>

      <button onClick={deleteListing}  >Delete</button>
      <hr />
      <h1>Leave a Review</h1>
      <div className="review">
        <form onSubmit={reviewSubmit}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="range"
            id="rating"
            min={0}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          required minLength={10}
          
          />
          <div className="area">
            <textarea
              id="text"
              rows={5}
              placeholder="Write your review here"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
                required/>
            <Button type="submit" variant="contained" className="button">
              Submit
            </Button>
          </div>
        </form>
      </div>

      <h1>Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Card sx={{ minWidth: 275, marginBottom: 2 }} key={index}>
            <CardContent>
              <Typography sx={{ fontSize: 14, color: "text.secondary" }} gutterBottom>
                Review {index + 1}
              </Typography>
              <Typography variant="h5" component="div">
                Rating: {review.rating}/5
              </Typography>
              <Typography variant="body2" className="comment">
              <p>  {review.comment}</p>
              </Typography>
            </CardContent>
            
          </Card>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Show;