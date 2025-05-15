import express from 'express';
import itemRoutes from "./routes/items";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/items", itemRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});