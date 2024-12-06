import { useState } from "react";
import styles from "./CreateProd.module.scss";
import { OrderList } from "../OrderList/OrderList";
import axios from "axios";

export const CreateProd = () => {
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

  return (
    <div className={styles.adminP}>
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
      <OrderList />
    </div>
  );
};

export default CreateProd;
