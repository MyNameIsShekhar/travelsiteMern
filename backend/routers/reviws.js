const Listing=require("../model/listing")
const express=require("express")
const router=express.Router({mergeParams:true})
const Reviews =require("../model/riview")

router.post("/", async (req, res) => {
    try {
      const { id } = req.params;
      let listing = await Listing.findById(id);
  
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
  
      let newReview = new Reviews({
        rating: req.body.rating,   // Access rating directly
        comment: req.body.comment, // Access comment directly
      });
  
      listing.reviews.push(newReview);
  
      await newReview.save();
      await listing.save(); // Save the listing with new review
  
      console.log("New review saved");
  
      res.status(200).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  module.exports=router