import manufacturerModel from "../models/manufacturerModel.js";
import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addManufacturer = async (req, res) => {
  try {
    const { name, country, yearFounded, description } = req.body;

    let logoUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "manufacturers"
      });
      logoUrl = result.secure_url;
    }

    const manufacturer = new manufacturerModel({
      name,
      country,
      yearFounded,
      description,
      logoUrl
    });

    await manufacturer.save();
    res.json({ success: true, message: "Manufacturer added", manufacturer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const listManufacturers = async (req, res) => {
  try {
    const manufacturers = await manufacturerModel.find({});
    res.json({ success: true, manufacturers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeManufacturer = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Manufacturer ID is required" });
    }

    const manufacturer = await manufacturerModel.findById(id);
    if (!manufacturer) {
      return res.status(404).json({ success: false, message: "Manufacturer not found" });
    }

    const products = await productModel.find({ manufacturer: id });

    if (products.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete manufacturer — there are still products linked to this manufacturer."
      });
    }

    await manufacturerModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Manufacturer deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const singleManufacturer = async (req, res) => {
  try {
    const { manufacturerId } = req.body;
    const manufacturer = await manufacturerModel.findById(manufacturerId);
    res.json({ success: true, manufacturer });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateManufacturer = async (req, res) => {
  try {
    const { manufacturerId, name, country, yearFounded, description } = req.body;

    let updateData = { name, country, yearFounded, description };

    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "manufacturers"
      });
      updateData.logoUrl = result.secure_url;
    }

    const updatedManufacturer = await manufacturerModel.findByIdAndUpdate(
      manufacturerId,
      updateData,
      { new: true }
    );

    if (!updatedManufacturer) return res.status(404).json({ success: false, message: "Manufacturer not found" });

    res.json({ success: true, message: "Manufacturer updated", manufacturer: updatedManufacturer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addManufacturer, listManufacturers, removeManufacturer, singleManufacturer, updateManufacturer };
