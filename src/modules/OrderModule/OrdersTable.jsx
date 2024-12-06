import styles from "./OrdersTable.module.scss";
import { Container } from "../../ui/Container/Container";
import axios from "axios";
import { useState } from "react";
import { useBalance } from "./context/BalanceProvider/BalanceProvider";

const OrdersTable = () => {
  const { balance, setBalance, orders, setOrders } = useBalance();
  const [phone, setPhone] = useState("");

  const updateQuantity = (id, delta) => {
    const updatedOrders = orders
      .map((order) =>
        order.id === id
          ? { ...order, quantity: Math.max(order.quantity + delta, 0) }
          : order
      )
      .filter((order) => order.quantity > 0);

    setOrders(updatedOrders);
  };

  const calculateTotal = () => {
    return orders.reduce(
      (total, order) => total + order.quantity * order.price,
      0
    );
  };

  const prepareDataForServer = () => {
    return {
      phone,
      orders: orders.map((order) => ({
        title: order.title,
        description: order.desc,
        quantity: order.quantity,
        price: order.price,
        img: order.img,
      })),
      totalPrice: calculateTotal(),
    };
  };

  const handleCheckout = async () => {
    if (!phone.trim()) {
      alert("Пожалуйста, укажите номер телефона.");
      return;
    }

    const totalPrice = calculateTotal();
    if (balance < totalPrice) {
      alert(
        `Недостаточно средств! Пополните баланс на ${totalPrice - balance} сом.`
      );
      return;
    }

    const dataToSend = prepareDataForServer();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Покупка успешно совершена!");
        setBalance(balance - totalPrice);
        setOrders([]);
      } else {
        console.error("Неожиданный ответ сервера:", response.status);
        alert("Произошла ошибка при оплате. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
      alert("Ошибка подключения к серверу. Проверьте настройки.");
    }
  };

  const handleAddFunds = () => {
    const funds = prompt("Введите сумму пополнения:");
    const parsedFunds = parseInt(funds, 10);

    if (isNaN(parsedFunds) || parsedFunds <= 0) {
      alert("Некорректная сумма!");
      return;
    }

    setBalance(balance + parsedFunds);
    alert(
      `Баланс успешно пополнен на ${parsedFunds} сом. Текущий баланс: ${
        balance + parsedFunds
      } сом.`
    );
  };

  return (
    <div className="container">
      <Container>
        <div className={styles.ordersTable}>
          <h2 className={styles.title}>Создание заказа:</h2>
          <div className={styles.numAre}>
            <p>Введите номер телефона *</p>
            <input
              type="text"
              placeholder="Введите номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.phoneInput}
            />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название товара</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.title}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price * order.quantity} ₽</td>
                  <td>
                    <button
                      className={styles.decreaseButton}
                      onClick={() => updateQuantity(order.id, -1)}
                    >
                      -
                    </button>
                    <button
                      className={styles.increaseButton}
                      onClick={() => updateQuantity(order.id, 1)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.totalContainer}>
            <p>Итого: {calculateTotal()} сом</p>
            <p>Ваш баланс: {balance} сом</p>
            <button className={styles.payButton} onClick={handleCheckout}>
              Оплатить
            </button>
            <button className={styles.addFundsButton} onClick={handleAddFunds}>
              Пополнить баланс
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersTable;
