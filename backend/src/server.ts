
import dotenv from "dotenv";
import app from "./app.ts";
import connectDB from "./config/db.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;
// 127.0.0.1
//mongodb://localhost:27017
// MONGO_URI=mongodb+srv://milindvpatil05_db_user:E3SWKta3eDaMwk5o@cluster0.mongodb.net/avirat?retryWrites=true&w=majority
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("MongoDB connection failed:", error);
  process.exit(1);
});
