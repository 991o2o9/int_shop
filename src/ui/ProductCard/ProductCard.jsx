import axios from "axios";
import styles from "./ProductCard.module.scss";
import { MdDeleteSweep } from "react-icons/md";
import { useState } from "react";
import { useBalance } from "../../modules/OrderModule/context/BalanceProvider/BalanceProvider";
import { AiFillEdit } from "react-icons/ai";
import { EditModal } from "../../modules/AdminModule/EditModal/EditModal";

export const ProductCard = ({ item, isAdmin = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useBalance();

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={item.img} alt={item.title} />
      </div>
      <div className={styles.info}>
        <div className={styles.description}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.desc}>{item.desc}</span>
        </div>
        <div className={styles.priceArea}>
          <p>{item.price} сом</p>
          <div className={styles.rulePlace}>
            {isAdmin && (
              <>
                <AiFillEdit className={styles.icon} onClick={toggleModal} />
                <MdDeleteSweep
                  className={styles.icon}
                  onClick={() => deleteItem(item._id)}
                />
              </>
            )}
            {!isAdmin && (
              <button className={styles.buyBtn} onClick={() => addToCart(item)}>
                Купить
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditModal currentProduct={item} toggleModal={toggleModal} />
      )}
    </div>
  );
};
