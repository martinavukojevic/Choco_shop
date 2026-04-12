import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {


  const currency = '€';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [token, setToken] = useState('')
  const [wishlist, setWishlist] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);




  useEffect(() => {

    const fetchWishlist = async () => {
      if (token) {
        try {
          const res = await axios.get(backendUrl + '/api/wishlist', {
            headers: { token },
          });
          setWishlist(res.data.wishlist.map(item => item._id));
        } catch (error) {
          console.log(error);
        }
      } else {
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, [token]);
  const addToWishlist = async (productId) => {
    if (!token) {
      alert("You need to login first!");
      return;
    }
    try {
      const res = await axios.post(backendUrl + '/api/wishlist/add', { productId }, { headers: { token } });
      setWishlist(prev => (prev.includes(productId) ? prev : [...prev, productId]));
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) {
      alert("You need to login first!");
      return;
    }
    try {
      const res = await axios.post(backendUrl + '/api/wishlist/remove', { productId }, { headers: { token } });

      setWishlist(prev => prev.filter(id => id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);



  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('You must choose a size before proceeding.');
      return;
    }

    if (token) {
      try {
        const res = await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, size },
          { headers: { token } }
        );


        if (res.data.success) {
          let cartData = structuredClone(cartItems);

          if (cartData[itemId]) {
            if (cartData[itemId][size]) {
              cartData[itemId][size] += 1;
            } else {
              cartData[itemId][size] = 1;
            }
          } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
          }

          setCartItems(cartData);
          toast.success('Added to cart!');
        }

      } catch (error) {
        console.log(error);
        const msg = error?.response?.data?.message || error.message;
        toast.error(msg);
      }
    } else {
      toast.error('Please log in to add to your cart!');
    }
  };



  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];

          }
        } catch (error) {

        }
      }
    }
    return totalCount;
  }

const updateQuantity = async (itemId, size, quantity) => {
  if (quantity < 0) {
    toast.error('Quantity cannot be negative.');
    return;
  }

  if (!token) {
    toast.error('Please log in to add to your cart!');
    return;
  }

  try {
    const res = await axios.post(
      backendUrl + '/api/cart/update',
      { itemId, size, quantity },
      { headers: { token } }
    );

    if (res.data.success) {
      let cartData = structuredClone(cartItems);

      if (quantity === 0) {
      
        delete cartData[itemId]?.[size];

       
        if (cartData[itemId] && Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }

        toast.success('Product removed.');
      } else {
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;
      }

      setCartItems(cartData);
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    } else {
      toast.error(res.data.message || 'Failed to update.');
    }
  } catch (error) {
    console.log(error);
    const msg = error?.response?.data?.message || error.message;
    toast.error(msg);
  }
};


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find(product => product._id === itemId);
      if (!product) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        const price = product.price[size];
        if (price && quantity > 0) {
          totalAmount += price * quantity;
        }
      }
    }
    return totalAmount;
  };


  const getProductsData = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }


    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }
  }

  const getUserCart = async (token) => {
    try {
      const userId = JSON.parse(atob(token.split('.')[1])).id;

      const response = await axios.post(
        backendUrl + '/api/cart/get',
        { userId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    getProductsData();
  }, [])


  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'));
    } else {

      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart).filter(item => item.quantity > 0);
        setCartItems(parsedCart);
      }

    }
  }, []);


  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, setCartItems, addToCart,
    getCartCount, updateQuantity,
    getCartAmount, backendUrl,
    setToken, token, navigate, wishlist,
    addToWishlist, removeFromWishlist,
    isInWishlist,
    discountPercent, setDiscountPercent,


  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )

}

export default ShopContextProvider;