import axios from 'axios';
import React from 'react';
import "./cssflis/form.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ListingForm = () => {
  const navigate = useNavigate();
  
  // React Hook Form setup
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  // Form submission handler
  const submitData = async (data) => {
   


    try {
      await axios.post("http://localhost:8080/listings/addNewlistings", data);
      navigate("/listings");
    } catch (error) {
      console.log("Error submitting data:", error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(submitData)} className='container-item'>

        {/* Title */}
        <div className="inputbox">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            placeholder='Enter title' 
            {...register("title", { required: "Title is required" })} 
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="inputbox">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            placeholder='Enter description' 
            {...register("description", { required: "Description is required" })} 
          />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div className="inputbox">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            placeholder='Enter price' 
            {...register("price", { required: "Price is required", min: 1 })} 
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        {/* Location & Country */}
        <div className="inputbox">
          <div className='place'> 
            <label htmlFor="location">Location</label>
            <input 
              type="text" 
              placeholder='Enter location' 
              {...register("location", { required: "Location is required" })} 
            />
            {errors.location && <p className="error">{errors.location.message}</p>}
          </div>
          <div className='place'>
            <label htmlFor="country">Country</label>
            <input 
              type="text" 
              placeholder='Enter country' 
              {...register("country", { required: "Country is required" })} 
            />
            {errors.country && <p className="error">{errors.country.message}</p>}
          </div>
        </div>

        {/* Image */}
        <div className="inputbox">
          <label htmlFor="image">Image</label>
          <input 
            type="text" 
            placeholder='Enter image URL' 
            {...register("image", { required: "Image URL is required" })} 
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="hover-button">Submit</button>

      </form>
    </div>
  );
};

export default ListingForm;