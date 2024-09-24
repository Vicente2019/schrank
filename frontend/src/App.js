// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewItem from './components/NewItem';
import ItemList from './components/ItemList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/items" element={<ItemList />} />
                <Route path="/items/new" element={<NewItem />} />
            </Routes>
        </Router>
    );
}

export default App;
