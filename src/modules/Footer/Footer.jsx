import { Link, NavLink, useLocation } from "react-router-dom";
import { Container } from "../../ui/Container/Container";
import styles from "./Footer.module.scss";
import { navigation, path } from "../../utils/constants/constants";
import { LogoDark } from "../../assets/icons/LogoDark";
import { scrollToTop } from "../../utils/helpers/helpers";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
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
              <LogoDark className={styles.logo} />
            </Link>
            <div className={styles.info}>
              <span className={styles.first}>Ежедневно</span>
              <span className={styles.second}>10:00 - 22:00</span>
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
                <span className={styles.num}>+996 555 555 555</span>
              </a>
              <span className={styles.text}>Обратный звонок</span>
            </div>
            <div className={styles.social}>
              <a href="" target="_blank">
                <FaWhatsapp />
              </a>
              <a href="" target="_blank">
                <FaTelegram />
              </a>
              <a href="" target="_blank">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
