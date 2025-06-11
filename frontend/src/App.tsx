import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import OutfitsPage from "./pages/OutfitsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/items" replace />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/outfits" element={<OutfitsPage />} />
      </Routes>
    </Router>
  );
}
