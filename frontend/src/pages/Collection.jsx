import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title.jsx';
import ProductItem from '../components/ProductItem';


const typeDisplayNames = {
  milk: 'Milk Chocolate',
  dark: 'Dark Chocolate',
  ruby: 'Ruby Chocolate',
  white: 'White Chocolate',
  filled: 'Filled Chocolate',
  couverture: 'Couverture Chocolate',
  organic: 'Organic Chocolate',
  vegan: 'Vegan Chocolate',
  add_ons: 'Chocolate with add ons',
  box: 'Chocolate Box'
};

const FilterTag = ({ value, onClick, selected, count }) => {
  return (
    <span
      onClick={() => onClick(value)}
      title={`${count} product${count !== 1 ? 's' : ''}`}
      className={`
        cursor-pointer px-3 py-1 rounded-full text-sm border border-gray-300
        transition-all duration-200 select-none
        ${selected
          ? 'bg-[#9e7160] text-white border-[#9e7160]'
          : 'bg-white text-gray-800 hover:bg-yellow-700 hover:text-white'
        }
        flex items-center justify-center
      `}
    >
      {typeDisplayNames[value] || value.replace('-', ' ')}
    </span>
  );
};

const LuxuryFilters = ({
  showFilter,
  products,
  selectedTypes,
  toggleType,
  selectedCocoa,
  toggleCocoa,
  selectedMilk,
  toggleMilk
}) => {
  const types = Array.from(new Set(products.map(p => p.type))).filter(Boolean);

  const countByType = (type) => products.filter(p => p.type === type).length;
  const countByCocoa = (range) => products.filter(p => {
    if (!p.cocoaPercentage) return false;
    const cocoa = Number(p.cocoaPercentage);
    return range === 'below-50' ? cocoa < 50 : cocoa >= 50;
  }).length;
  const countByMilk = (range) => products.filter(p => {
    if (!p.milkPercentage) return false;
    const milk = Number(p.milkPercentage);
    return range === 'below-50' ? milk < 50 : milk >= 50;
  }).length;

  return (
    <aside
      className={`
        ${showFilter ? '' : 'hidden'} sm:block
        w-60 lg:w-72
        bg-white/50 backdrop-blur-md rounded-xl
        border border-white/50 shadow-lg
        p-5 flex flex-col gap-6
      `}
    >
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Type</h4>
        <div className="flex flex-wrap justify-start gap-2">
          {types.map((type) => (
            <FilterTag
              key={type}
              value={type}
              onClick={toggleType}
              selected={selectedTypes.includes(type)}
              count={countByType(type)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Cocoa %</h4>
        <div className="flex flex-wrap justify-start gap-2">
          {['below-50', 'above-50'].map((c) => (
            <FilterTag
              key={c}
              value={c}
              onClick={toggleCocoa}
              selected={selectedCocoa.includes(c)}
              count={countByCocoa(c)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Milk %</h4>
        <div className="flex flex-wrap justify-start gap-2">
          {['below-50', 'above-50'].map((m) => (
            <FilterTag
              key={m}
              value={m}
              onClick={toggleMilk}
              selected={selectedMilk.includes(m)}
              count={countByMilk(m)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCocoa, setSelectedCocoa] = useState([]);
  const [selectedMilk, setSelectedMilk] = useState([]);
  const [sortType, setSortType] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const getMinPrice = (priceObj) => {
    if (!priceObj || typeof priceObj !== 'object') return null;
    const prices = Object.values(priceObj).map(p => Number(p)).filter(p => !isNaN(p) && p > 0);
    return prices.length ? Math.min(...prices) : null;
  };

  const toggleType = (value) => {
    setSelectedTypes(prev => prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]);
  };
  const toggleCocoa = (value) => {
    setSelectedCocoa(prev => prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]);
  };
  const toggleMilk = (value) => {
    setSelectedMilk(prev => prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]);
  };

  useEffect(() => {
    let filtered = products.slice();

    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(item => selectedTypes.includes(item.type));
    }

    if (selectedCocoa.length > 0) {
      filtered = filtered.filter(item => {
        if (!item.cocoaPercentage) return false;
        const cocoa = Number(item.cocoaPercentage);
        return selectedCocoa.some(s => s === 'below-50' ? cocoa < 50 : cocoa >= 50);
      });
    }

    if (selectedMilk.length > 0) {
      filtered = filtered.filter(item => {
        if (!item.milkPercentage) return false;
        const milk = Number(item.milkPercentage);
        return selectedMilk.some(s => s === 'below-50' ? milk < 50 : milk >= 50);
      });
    }

    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => getMinPrice(a.price) - getMinPrice(b.price));
        break;
      case 'high-low':
        filtered.sort((a, b) => getMinPrice(b.price) - getMinPrice(a.price));
        break;
      default:
        break;
    }

    setFilterProducts(filtered);
    setCurrentPage(1);
  }, [products, search, showSearch, selectedTypes, selectedCocoa, selectedMilk, sortType]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 select-none"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            alt="toggle"
          />
        </p>

        <LuxuryFilters
          showFilter={showFilter}
          products={products}
          selectedTypes={selectedTypes}
          toggleType={toggleType}
          selectedCocoa={selectedCocoa}
          toggleCocoa={toggleCocoa}
          selectedMilk={selectedMilk}
          toggleMilk={toggleMilk}
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-xl mb-6 bg-gradient-to-br from-zinc-50 to-zinc-100/30 backdrop-blur-lg rounded-lg px-6 py-4 shadow-sm">
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-zinc-300 text-sm px-3 py-1 bg-white/90 rounded-md hover:border-yellow-500 hover:shadow-md transition-all duration-300"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {currentProducts.map(item => (
            <div key={item._id} className="product-card cursor-pointer bg-white rounded-xl shadow-md">
              <ProductItem
                name={item.name}
                price={item.price}
                id={item._id}
                image={item.image}
                quantity={item.quantity}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(filterProducts.length / productsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full border border-zinc-300 transition-all duration-300
                ${currentPage === i + 1
                  ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md'
                  : 'bg-gradient-to-br from-zinc-50 to-zinc-100 text-gray-800 hover:shadow-sm hover:text-black'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
