const mongoose=require("mongoose")
const dotenv=require("dotenv")
const Listing=require("./listing.js")
const initdata=require("./data.js")
dotenv.config()

const databaseConnection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/travel-website");
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};
databaseConnection();

const initDb = async () => {
    try {
        await databaseConnection(); // Ensure DB is connected before inserting data
        await Listing.insertMany(initdata.data);
        console.log("Database seeded successfully!");
        mongoose.connection.close(); // Close connection after insertion
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
initDb()