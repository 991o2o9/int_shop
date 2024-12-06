import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ChangeModal.module.scss";

export const ChangeModal = ({ toggleModal, currentProduct }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    desc: "",
    img: "",
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        title: currentProduct.title || "",
        price: currentProduct.price || "",
        desc: currentProduct.desc || "",
        img: currentProduct.img || "",
      });
    }
  }, [currentProduct]);

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
    updateItem(currentProduct._id, { title, price, desc, img });
    ``;
  };

  const updateItem = async (_id, data) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${_id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Товар успешно обновлен");
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Ошибка при обновлении товара");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={toggleModal}>
          &times;
        </button>
        <input
          type="text"
          name="title"
          placeholder="Название"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="desc"
          placeholder="Описание"
          value={formData.desc}
          onChange={handleChange}
        />
        <input
          type="text"
          name="img"
          placeholder="Ссылка на изображение"
          value={formData.img}
          onChange={handleChange}
        />
        <button className={styles.saveButton} onClick={handleSave}>
          Сохранить
        </button>
      </div>
    </div>
  );
};
