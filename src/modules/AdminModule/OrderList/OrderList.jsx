import { useEffect, useState } from "react";
import styles from "./OrderList.module.scss";
import axios from "axios";
import { OrderCard } from "../../../ui/OrderCards/OrderCard";
import { Container } from "../../../ui/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { HiCursorClick } from "react-icons/hi";
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

  const navigate = useNavigate();

  return (
    <div className={styles.orders}>
      <Container>
        <div className={styles.navigation}>
          <Link onClick={() => navigate(-1)} className={styles.orderList}>
            <span>Назад</span> <HiCursorClick />
          </Link>
        </div>
        <h3>Заказы Пользователей</h3>
        <div className={styles.list}>
          {data.map((item, index) => (
            <OrderCard key={index} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};
