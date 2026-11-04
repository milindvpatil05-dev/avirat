import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(
    "/api/v1/users",
    userRoutes
  );

export default app;