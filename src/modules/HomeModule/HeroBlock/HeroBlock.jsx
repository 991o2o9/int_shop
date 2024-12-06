import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constants/constants";
import { Textpart } from "./components/textPart/Textpart";
import styles from "./HeroBlock.module.scss";
export const HeroBlock = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>Одежда для активных — Стиль и Комфорт на Каждый День</h1>
          <span>
            Открой для себя коллекцию одежды, которая сочетает в себе стиль,
            комфорт и технологичность. Для спорта, отдыха и городских прогулок —
            каждый элемент создан для твоих достижений. Быстрая доставка по
            Кыргызстану и бесплатный возврат. Не упусти шанс быть в тренде —
            заказывай прямо сейчас!
          </span>
          <button onClick={() => navigate(path.productPage)}>Посмотреть</button>
        </div>
      </section>
      <Textpart />
    </>
  );
};
