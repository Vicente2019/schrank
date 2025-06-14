import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import OutfitsPage from "./pages/OutfitsPage";
import Navbar from "./components/navbar/Navbar";
import NewOutfitPage from "./pages/NewOutfitPage";
import ShowItemPage from "./pages/ShowItemPage";
import ShowOutfitPage from "./pages/ShowOutfitPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:id" element={<ShowItemPage />} />
          <Route path="/outfits" element={<OutfitsPage />} />
          <Route path="/outfits/new" element={<NewOutfitPage />} />
          <Route path="/outfits/:id" element={<ShowOutfitPage />} />
        </Routes>
      </main>
    </Router>
  );
}
