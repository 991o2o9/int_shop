import { useEffect, useState } from "react";
import styles from "./OrderList.module.scss";
import axios from "axios";
import { OrderCard } from "../../../ui/OrderCards/OrderCard";
export const OrderList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.orders}>
      <h3>Заказы Пользователей</h3>
      <div className={styles.list}>
        {data.map((item, index) => (
          <OrderCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
