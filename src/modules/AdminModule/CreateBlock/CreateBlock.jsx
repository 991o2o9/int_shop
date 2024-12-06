import { useEffect, useState } from "react";
import styles from "./CreateBlock.module.scss";
import axios from "axios";
import { Container } from "../../../ui/Container/Container";
import { Link } from "react-router-dom";
import { path } from "../../../utils/constants/constants";
import { HiCursorClick } from "react-icons/hi";
import { ProductCard } from "../../../ui/ProductCard/ProductCard";

export const CreateBlock = () => {
  const [productList, setProductList] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: null,
    desc: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSave = () => {
    const { title, price, desc, img } = formData;
    if (!title.trim() || !desc.trim() || !img.trim() || price <= 0) {
      alert(
        "Все поля обязательны для заполнения, а цена должна быть больше 0!"
      );
      return;
    }
    createItem({ title, price, desc, img });
  };

  const createItem = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Товар успешно создан");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log(productList);

  return (
    <Container>
      <div className={styles.navigation}>
        <Link to={path.home} className={styles.orderList}>
          <span>Вернуться домой</span> <HiCursorClick />
        </Link>
        <Link to={path.userOrder} className={styles.orderList}>
          <span>Перейти к заказам пользователей</span> <HiCursorClick />
        </Link>
      </div>
      <div className={styles.block}>
        <div className={styles.create}>
          <h3>Создать товар</h3>
          <div className={styles.inpArea}>
            <input
              required
              type="text"
              placeholder="Название"
              onChange={handleChange}
              name="title"
              value={formData.title}
            />

            <input
              onChange={handleChange}
              required
              type="number"
              placeholder="Цена"
              name="price"
              value={formData.price}
            />
            <input
              required
              type="text"
              placeholder="Описание"
              onChange={handleChange}
              name="desc"
              value={formData.desc}
            />
            <input
              required
              type="text"
              placeholder="URL- путь на фотографию"
              onChange={handleChange}
              name="img"
              value={formData.img}
            />
          </div>
          <button onClick={handleSave}>Создать</button>
        </div>
        <div className={styles.productList}>
          {productList.map((item) => (
            <ProductCard isAdmin={true} key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CreateBlock;
