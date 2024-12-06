import { Container } from "../../../ui/Container/Container";
import styles from "./ProductBlock.module.scss";
import { ProductCard } from "../../../ui/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProductBlock = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <div className={styles.productBlockItself}>
        <h3>Aссортимент товара</h3>
        <div className={styles.productList}>
          {product.slice(0, 8).map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};
