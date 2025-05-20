import express from 'express';
import itemRoutes from "./routes/items";
import outfitRoutes from "./routes/outfits";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/outfits", outfitRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});