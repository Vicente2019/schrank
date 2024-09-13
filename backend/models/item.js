const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },             
    brand: { type: String, required: true },           
    color: { type: String, required: true },                               
    category: { type: String, required: true },                                 
    size: { type: String },     
    image: { type: String },                           
    price: { type: Number },                                                 
    tags: [String],
});

module.exports = mongoose.model('Item', ItemSchema)