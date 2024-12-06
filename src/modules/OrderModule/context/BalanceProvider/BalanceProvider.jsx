import { createContext, useContext, useState, useEffect } from "react";
export const BalanceContext = createContext();
export const useBalance = () => useContext(BalanceContext);

const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    return parseInt(localStorage.getItem("balance"), 10) || 0;
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(orders));
    localStorage.setItem("balance", balance);
  }, [orders, balance]);

  const addToCart = (item) => {
    const existingProductIndex = orders.findIndex(
      (product) => product.id === item.id
    );

    let updatedOrders = [...orders];
    if (existingProductIndex >= 0) {
      updatedOrders[existingProductIndex].quantity += 1;
    } else {
      updatedOrders.push({ ...item, quantity: 1 });
    }

    setOrders(updatedOrders);
    alert("Товар добавлен в корзину!");
  };

  const contextValue = {
    balance,
    setBalance,
    orders,
    setOrders,
    addToCart,
  };

  return (
    <BalanceContext.Provider value={contextValue}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
