import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

const currency = 'eur'
const deliveryCharges = 10

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    for (const item of items) {
      const selectedSize = item.size;
      const product = await productModel.findById(item._id);

      if (!product) {
        console.warn(`Product with ID ${item._id} not found.`);
        continue;
      }

      if (!product.quantity) {
        console.warn(`Product ${product.name} has no quantity defined.`);
        continue;
      }

      if (product.quantity[selectedSize] === undefined) {
        console.warn(`Size ${selectedSize} not found for product ${product.name}. Available sizes: ${Object.keys(product.quantity).join(', ')}`);
        continue;
      }

      const currentQuantity = Number(product.quantity[selectedSize]);
      const orderedQuantity = Number(item.quantity);



      if (currentQuantity < orderedQuantity) {
        console.warn(
          `Not enough stock for product ${product.name} size ${selectedSize}. Requested: ${orderedQuantity}, Available: ${currentQuantity}`
        );
        continue;
      }

      product.quantity[selectedSize] = currentQuantity - orderedQuantity;
      if (product.quantity[selectedSize] < 0) product.quantity[selectedSize] = 0;

      product.markModified('quantity');
      await product.save();
    }

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const allOrders = async (req, res) => {

  try {

    const orders = await orderModel.find({})
    res.json({ success: true, orders })

  } catch (error) {

    console.log(error);
    res.json({ success: false, message: error.message })

  }

}






const userOrders = async (req, res) => {


  try {

    const { userId } = req.body

    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })

  } catch (error) {

    console.log(error);
    res.json({ success: false, message: error.message })

  }

}


const updateStatus = async (req, res) => {

  try {

    const { orderId, status } = req.body

    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status updated!' })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }

}


export const mostSoldProduct = async (req, res) => {
  try {
    const orders = await orderModel.find()

    const productSales = {}

    orders.forEach(order => {
      order.items.forEach(item => {
        const productName = item.name
        const quantity = item.quantity
        if (productSales[productName]) {
          productSales[productName] += quantity
        } else {
          productSales[productName] = quantity
        }
      })
    })

    let mostSold = null
    let maxQty = 0

    for (const [product, qty] of Object.entries(productSales)) {
      if (qty > maxQty) {
        maxQty = qty
        mostSold = product
      }
    }

    res.json({ success: true, product: mostSold, quantity: maxQty })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { placeOrder, allOrders, userOrders, updateStatus }

