import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: String,
    yearFounded: Number,
    description: String,
    logoUrl: String  
})

const manufacturerModel = mongoose.models.manufacturer || mongoose.model("manufacturer", manufacturerSchema);

export default manufacturerModel;
