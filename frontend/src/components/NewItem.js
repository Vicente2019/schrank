import React, { useState } from 'react';
import axios from 'axios';

const NewItem = () => {
    const [itemData, setItemData] = useState({
        name: '',
        brand: '',
        color: '',
        category: '',
        size: '',
        image: '',
        price: '',
        tags: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });
    };

    const createItem = async (itemData) => {
        try {
           await axios.post("http://localhost:8080/items", itemData );
            window.location.href = '/items';
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const tagsArray = itemData.tags.split(',').map(tag => tag.trim());
        const itemDataToSubmit = { ...itemData, tags: tagsArray};
        try {
            await createItem(itemDataToSubmit);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add New Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={itemData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={itemData.brand}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Color:</label>
                    <input
                        type="text"
                        name="color"
                        value={itemData.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={itemData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Size:</label>
                    <input
                        type="text"
                        name="size"
                        value={itemData.size}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={itemData.image}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={itemData.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tags (comma-separated):</label>
                    <input
                        type="text"
                        name="tags"
                        value={itemData.tags}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default NewItem;
