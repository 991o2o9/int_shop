import { Link, NavLink, useLocation } from "react-router-dom";
import { Container } from "../../ui/Container/Container";
import styles from "./Footer.module.scss";
import { navigation, path } from "../../utils/constants/constants";
import { scrollToTop } from "../../utils/helpers/helpers";
import { MdWatchLater } from "react-icons/md";
import { Logo } from "../../assets/icons/Logo";
export const Footer = () => {
  const location = useLocation();

  const getActiveLink = (pathName) => {
    const currentPathSegment = location.pathname.split("/")[1];
    const targetPathSegment = pathName.split("/")[1];
    return currentPathSegment === targetPathSegment ? styles.active : "";
  };

  return (
    <footer>
      <Container>
        <div className={styles.footer}>
          <div className={styles.logoPart}>
            <Link to={path.home}>
              <Logo color={"#fff"} />
            </Link>
            <div className={styles.info}>
              <MdWatchLater className={styles.icon} />
              <span className={styles.first}>Круглосуточно</span>
            </div>
          </div>
          <nav>
            <h3>Навигация</h3>
            <div className={styles.navigation}>
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={getActiveLink(item.path)}
                  onClick={() => scrollToTop()}
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>
          <div className={styles.contact}>
            <div className={styles.number}>
              <a href="tel:996555555555">
                <span className={styles.num}>+996999999999</span>
              </a>
              <span className={styles.text}>Обратный звонок</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
