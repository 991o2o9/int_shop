import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { navigation, path } from "../../utils/constants/constants";
import { Logo } from "../../assets/icons/Logo";
import { scrollToTop } from "../../utils/helpers/helpers";
import { useBalance } from "../OrderModule/context/BalanceProvider/BalanceProvider";

export const Header = () => {
  const { balance, orders } = useBalance();
  const location = useLocation();

  const getActiveLink = (pathName) => {
    const currentPathSegment = location.pathname.split("/")[1];
    const targetPathSegment = pathName.split("/")[1];
    return currentPathSegment === targetPathSegment ? styles.active : "";
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <nav className={styles.nav}>
          <Link to={path.home}>
            <Logo />
          </Link>
          {navigation.map((item, index) => (
            <Link
              className={getActiveLink(item.path)}
              key={index}
              to={item.path}
              onClick={scrollToTop()}
            >
              <span>{item.label}</span>
              {item.label === "Заказы" && orders?.length > 0 && (
                <div className={styles.notificationBadge}></div>
              )}
            </Link>
          ))}
          <Link style={{ color: "#f7f7fc" }} to={path.admin}>
            Админ
          </Link>
          <div className={styles.balance}>
            <span>Текущий баланс: {balance} сом</span>
          </div>
        </nav>
      </div>
    </header>
  );
};
