import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {

    try {

        const { name, description, price, type, sizes, quantity, cocoaPercentage, milkPercentage, manufacturer  } = req.body

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)


        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: JSON.parse(price),
            type,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            quantity: JSON.parse(quantity),
            cocoaPercentage,
            milkPercentage,
            manufacturer

        }
        

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product added" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



const listProducts = async (req, res) => {



    try {


        const products = await productModel.find({});
        res.json({ success: true, products })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}







const removeProduct = async (req, res) => {



    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}








const singleProduct = async (req, res) => {


    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
       
        res.json({success:true,product})

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }



    
}

const updateProduct = async (req, res) => {
  try {
    
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Request body is missing" });
    }

   
    let existingImages = [];
    try {
      if (req.body.existingImages) {
        existingImages = JSON.parse(req.body.existingImages);
       
        existingImages = Array.isArray(existingImages) ? existingImages.filter(img => img !== null && img !== undefined && img !== '') : [];
      }
    } catch (parseError) {
      console.error("Backend: Error parsing existingImages:", parseError);
      existingImages = [];
    }

   
    const finalImages = [];
  
   
    for (let i = 0; i < 4; i++) {
      const fieldName = `image${i + 1}`;
      const newFile = req.files && req.files[fieldName] && req.files[fieldName][0];
      const existingImageUrl = existingImages[i];
      if (newFile) {

        try {
          const result = await cloudinary.uploader.upload(newFile.path, {
            resource_type: 'image',
          });
          finalImages.push(result.secure_url);
        } catch (uploadError) {
        
          if (existingImageUrl) {
              finalImages.push(existingImageUrl);
          }
         
        }
      } else if (existingImageUrl) {
        finalImages.push(existingImageUrl);
      }
      
    }

    
    const filteredFinalImages = finalImages.filter(img => img !== null && img !== undefined && img !== '');


   
    const {
      productId,
      name,
      description,
      price,
      type,
      sizes,
      quantity,
      cocoaPercentage,
      milkPercentage,
      manufacturer
    } = req.body;

    
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

   
   const updateData = {
      name,
      description,
      type,
      price: JSON.parse(price),
      sizes: JSON.parse(sizes),
      quantity: JSON.parse(quantity),
      image: filteredFinalImages ,
      cocoaPercentage,
      milkPercentage,
      manufacturer
    };

    

 
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

   

    if (!updatedProduct) {
    
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    
    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
   
    
    if (error.name === 'ValidationError') {
       
        return res.status(400).json({
            success: false,
            message: "Validation failed: " + error.message,
            errors: error.errors
        });
    }
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};



const getProductsByManufacturer = async (req, res) => {
  try {
    const { manufacturerId } = req.params;
    const products = await productModel.find({ manufacturer: manufacturerId });
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




export { listProducts, addProduct, removeProduct, singleProduct, updateProduct, getProductsByManufacturer }