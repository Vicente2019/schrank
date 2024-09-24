import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h1>Items in Your Closet</h1>
            <ul>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item._id}>
                            <h2>{item.name}</h2>
                            <p>Brand: {item.brand}</p>
                            <p>Color: {item.color}</p>
                            <p>Category: {item.category}</p>
                            <p>Price: ${item.price}</p>
                        </li>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </ul>
        </div>
    );
};

export default ItemList;
