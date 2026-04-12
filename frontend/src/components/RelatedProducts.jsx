import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const RelatedProducts = ({ type }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0 && type) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter(
        (item) => item.type && item.type.toLowerCase() === type.toLowerCase()
      );

      setRelated(productsCopy.slice(0, 5)); 
    }
  }, [products, type]);

  if (!related || related.length === 0) return null;

  return (
    <div className="my-24">
      <div className="text-center text-3xl">
        <div>
          <Title text1="RELATED" text2="PRODUCTS" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((item) =>
            item.image && item.image.length > 0 ? (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
