import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Object, required: true },
    image: { type: Array, required: true },
    type: { type: String, required: true },
    sizes: { type: Array, required: true },
    quantity: { type: Object, required: true, default: {}},
    cocoaPercentage: {type: Number},
    milkPercentage: {type:Number},
    manufacturer: {type:mongoose.Schema.Types.ObjectId, ref: 'manufacturer' }
    
}, { minimize: false })

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel