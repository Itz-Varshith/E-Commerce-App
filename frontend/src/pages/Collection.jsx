import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products ,search,showSearch} = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState(["relevant"]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((p) => {
        return p.filter((item) => item != e.target.value);
      });
    } else {
      setCategory((p) => [...p, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((p) => {
        return p.filter((item) => item != e.target.value);
      });
    } else {
      setSubCategory((p) => [...p, e.target.value]);
    }
  };

  function applyFilter() {
    let productsCopy = products.slice();
if(showSearch && search){
  productsCopy=productsCopy.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()));
}

    if (category.length > 0) {
      productsCopy = productsCopy.filter(
        (item) =>
          category.includes(item.category) &&
          subCategory.includes(item.subCategory)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  }

  function sortProduct() {
    let fpCopy = products.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(
          fpCopy.sort((a, b) => {
            return a.price - b.price;
          })
        );
        break;
      case "high-low":
        setFilterProducts(
          fpCopy.sort((a, b) => {
            return b.price - a.price;
          })
        );
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory,search,showSearch,products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 pt-10 border-t ">
      {/* filter options for the filter applicable */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer">
          Filters
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden pl-2 items-center ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap- cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleCategory}
                value={"Men"}
              />
              Men
            </p>
            <p className="flex gap- cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleCategory}
                value={"Women"}
              />
              Women
            </p>
            <p className="flex gap- cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleCategory}
                value={"Kids"}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Sub category filter} */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Subcategories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap- cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleSubCategory}
                value={"Topwear"}
              />
              Topwear
            </p>
            <p className="flex gap- cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleSubCategory}
                value={"Bottomwear"}
              />
              Bottomwear
            </p>
            <p className="flex gap- cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                onChange={toggleSubCategory}
                value={"Winterwear"}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* {Right side } */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />
          {/* {Product sort} */}
          <select
            className="border-gray-300 text-sm px-2"
            onChange={(e) => {
              return setSortType(e.target.value);
            }}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to low</option>
          </select>
        </div>
        {/* {Mapping products} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
