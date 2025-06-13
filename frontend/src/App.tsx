import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import OutfitsPage from "./pages/OutfitsPage";
import Navbar from "./components/navbar/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/outfits" element={<OutfitsPage />} />
        </Routes>
      </main>
    </Router>
  );
}
