import { useState, useEffect } from "react";
import { ProductCard } from "../../ui/ProductCard/ProductCard";
import { Search } from "../../ui/Search/Search";
import styles from "./ProductModule.module.scss";
import axios from "axios";

export const ProductModule = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products`);
        setOriginalData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = (search, sort, minPrice, maxPrice) => {
    let filtered = originalData;

    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((item) => item.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((item) => item.price <= parseFloat(maxPrice));
    }

    switch (sort) {
      case "asc":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "desc":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredData(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    filterData(searchTerm, sortOrder, priceRange.min, priceRange.max);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    filterData(searchValue, order, priceRange.min, priceRange.max);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
    filterData(
      searchValue,
      sortOrder,
      name === "min" ? value : priceRange.min,
      name === "max" ? value : priceRange.max
    );
  };

  const resetFilters = () => {
    setSearchValue("");
    setSortOrder("default");
    setPriceRange({ min: "", max: "" });
    setFilteredData(originalData);
    setNoResults(false);
  };

  return (
    <div className="container">
      <div className={styles.searchSortArea}>
        <div className={styles.sorter}>
          <span className={styles.title}>Сортировка:</span>
          <div className={styles.btnArea}>
            <button
              style={{
                transform: sortOrder === "default" ? "scale(1.05)" : "",
              }}
              onClick={resetFilters}
            >
              По умолчанию
            </button>
            <button
              style={{
                transform: sortOrder === "desc" ? "scale(1.05)" : "",
              }}
              onClick={() => handleSort("desc")}
            >
              По убыванию
            </button>
            <button
              style={{
                transform: sortOrder === "asc" ? "scale(1.05)" : "",
              }}
              onClick={() => handleSort("asc")}
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
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Цена от"
              />
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Цена до"
              />
            </div>
          </div>
        </div>

        <div className={styles.product}>
          <Search onSearch={handleSearch} initialValue={searchValue} />
          {noResults ? (
            <div className={styles.noResults}>Результаты не найдены</div>
          ) : (
            <div className={styles.productList}>
              {filteredData.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
