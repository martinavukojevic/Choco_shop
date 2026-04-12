import mongoose from 'mongoose';
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const product = await productModel.findById(itemId);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found." });

    if (product.quantity[size] === undefined)
      return res.status(400).json({
        success: false,
        message: `Size ${size} is not available for this product.`,
      });

    const availableStock = Number(product.quantity[size]);


    const userData = await userModel.findById(userId).select("cartData");
    if (!userData)
      return res.status(404).json({ success: false, message: "User not found." });

    const cartData = userData.cartData || {};

    const currentQty =
      cartData[itemId] && cartData[itemId][size] ? cartData[itemId][size] : 0;


    if (currentQty + 1 > availableStock) {
      return res.status(400).json({
        success: false,
        message: `Unfortunately, only ${availableStock} item${availableStock === 1 ? '' : 's'} ${availableStock === 1 ? 'is' : 'are'} available in stock.`,
      });
    }


    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = currentQty + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Added to cart!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};





const updateCart = async (req, res) => {

    try {

        const { userId, itemId, size, quantity } = req.body

         const userData = await userModel.findById(userId)
         let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

          await userModel.findByIdAndUpdate(userId, { cartData })
          res.json({ success: true, message: "Cart updated!" })


    } catch (error) {

       console.log(error)
        res.json({ success: false, message: error.message })
        
    }

}





const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};


    const filteredCart = {};

    for (let itemId in cartData) {
      for (let size in cartData[itemId]) {
        if (cartData[itemId][size] > 0) {
          if (!filteredCart[itemId]) filteredCart[itemId] = {};
          filteredCart[itemId][size] = cartData[itemId][size];
        }
      }
    }

    res.json({ success: true, cartData: filteredCart }); 

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export { addToCart, updateCart, getUserCart }