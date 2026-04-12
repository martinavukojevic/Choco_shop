import express from 'express';
import User from '../models/userModel.js';
import authUser from '../middleware/auth.js'; 
import Product from '../models/productModel.js';

const wishlistRouter = express.Router();



wishlistRouter.post('/add', authUser, async (req, res) => {
  const userId = req.userId; 
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


wishlistRouter.post('/remove', authUser, async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

wishlistRouter.get('/', authUser, async (req, res) => {
 
  try {
    const user = await User.findById(req.userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
   
    res.status(500).json({ success: false, message: error.message });
  }
});


export default wishlistRouter;
