const Listing=require("../model/listing")
const express=require("express")
const router=express.Router()
const cors = require("cors");

router.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL
        credentials: true, // Allow cookies & sessions
    })
);
router.get("/",async(req,res)=>{
    const newListing= await Listing.find({})
    req.session.test = "Session is working!";
    console.log("Session ID:", req.sessionID);
    
    res.send(newListing)
    })
    
    router.get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            
            
            const listingInfo = await Listing.findOne({ _id: id }).populate("reviews");;
    
            if (!listingInfo) {
                return res.status(404).send("Listing not found");
            }
    
            res.status(200).json(listingInfo);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    });
    router.post("/addNewlistings", async (req, res) => {
        try {
          if (!req.body) {
            console.log("Data not found");
            return res.status(400).json({ message: "Data not found" });
          }
      
          const newListing = new Listing(req.body); // Use req.body directly
          await newListing.save();
      
          console.log("Data saved successfully");
          res.status(201).json({ message: "Listing added successfully", data: newListing });
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
      });
      
    // delete rout
    
    
    router.post("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id)
            
            const listingInfo = await Listing.findByIdAndDelete(id)
            console.log(listingInfo)
        res.send(listingInfo)
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    });
    module.exports =router