import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { navigation, path } from "../../utils/constants/constants";
import { Logo } from "../../assets/icons/Logo";
import { scrollToTop } from "../../utils/helpers/helpers";
import { useBalance } from "../OrderModule/context/BalanceProvider/BalanceProvider";

export const Navbar = () => {
  const { balance } = useBalance();
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
            <Logo color={"#000"} />
          </Link>
          {navigation.map((item, index) => (
            <Link
              className={getActiveLink(item.path)}
              key={index}
              to={item.path}
              onClick={scrollToTop()}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={styles.balanceWallet}>
          <span>Ваш баланс: {balance} сом</span>
        </div>
      </div>
    </header>
  );
};
