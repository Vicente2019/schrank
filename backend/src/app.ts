import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
import express from 'express';
import itemRoutes from "./routes/items";
import outfitRoutes from "./routes/outfits";
import cors from "cors";
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5050;

mongoose.connect("mongodb://localhost:27017/schrank");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true,
})); 
app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/outfits", outfitRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});