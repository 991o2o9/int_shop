import { useNavigate } from "react-router-dom";
import { Container } from "../../../ui/Container/Container";
import { path } from "../../../utils/constants/constants";
import { Textpart } from "./components/textPart/Textpart";
import styles from "./HeroBlock.module.scss";
export const HeroBlock = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <section className={styles.hero}>
          <div className={styles.content}>
            <h1>УНИВЕРСАЛЬНАЯ КЛАВИАТУРА K380 BLUETOOTH</h1>
            <span>
              Доставка по всему Кыргызстану Бесплатно Успей заказать прямо
              сейчас.
            </span>
            <button onClick={() => navigate(path.productPage)}>
              Посмотреть
            </button>
          </div>
        </section>
      </Container>
      <Textpart />
    </>
  );
};
