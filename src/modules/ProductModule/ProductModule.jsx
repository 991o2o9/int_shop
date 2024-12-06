import { useState, useEffect } from "react";
import { ProductCard } from "../../ui/ProductCard/ProductCard";
import { Search } from "../../ui/Search/Search";
import styles from "./ProductModule.module.scss";
import axios from "axios";

export const ProductModule = () => {
  const [productList, setProductList] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("unSet");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProductList(response.data);
        setDisplayedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = (searchQuery, sortOrder, minPrice, maxPrice) => {
    let filteredProducts = productList;

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    switch (sortOrder) {
      case "ordinary":
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "desc":
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setDisplayedProducts(filteredProducts);
    setIsEmpty(filteredProducts.length === 0);
  };

  const handleQueryChange = (searchTerm) => {
    setQuery(searchTerm);
    applyFilters(searchTerm, order, priceFilter.min, priceFilter.max);
  };

  const handleSorting = (sortOrder) => {
    setOrder(sortOrder);
    applyFilters(query, sortOrder, priceFilter.min, priceFilter.max);
  };

  const handlePriceInput = (e) => {
    const { name, value } = e.target;
    setPriceFilter((prev) => ({ ...prev, [name]: value }));
    applyFilters(
      query,
      order,
      name === "min" ? value : priceFilter.min,
      name === "max" ? value : priceFilter.max
    );
  };

  const resetAllFilters = () => {
    setQuery("");
    setOrder("unSet");
    setPriceFilter({ min: "", max: "" });
    setDisplayedProducts(productList);
    setIsEmpty(false);
  };

  return (
    <div className="container">
      <div className={styles.searchSortArea}>
        <div className={styles.sorter}>
          <span className={styles.title}>Фильтрация:</span>
          <div className={styles.btnArea}>
            <button
              style={{
                transform: order === "unSet" ? "scale(1.05)" : "",
              }}
              onClick={resetAllFilters}
            >
              Сбросить
            </button>
            <button
              style={{
                transform: order === "desc" ? "scale(1.05)" : "",
              }}
              onClick={() => handleSorting("desc")}
            >
              По убыванию
            </button>
            <button
              style={{
                transform: order === "ordinary" ? "scale(1.05)" : "",
              }}
              onClick={() => handleSorting("ordinary")}
            >
              По возрастанию
            </button>
          </div>
          <div className={styles.byPrice}>
            <span className={styles.title}>По цене:</span>
            <div className={styles.inpArea}>
              <input
                type="number"
                name="min"
                value={priceFilter.min}
                onChange={handlePriceInput}
                placeholder="Цена от"
              />
              <input
                type="number"
                name="max"
                value={priceFilter.max}
                onChange={handlePriceInput}
                placeholder="Цена до"
              />
            </div>
          </div>
        </div>

        <div className={styles.product}>
          <Search onSearch={handleQueryChange} initialValue={query} />
          {isEmpty ? (
            <div className={styles.noResults}>Результаты не найдены</div>
          ) : (
            <div className={styles.productList}>
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
