import { Container } from "../../../../../ui/Container/Container";
import styles from "../../HeroBlock.module.scss";

export const Textpart = () => {
  const data = [
    {
      title: "Широкий ассортимент одежды",
      description:
        "Одежда для активных людей от лучших мировых брендов, включая Nike. Стиль и функциональность для спорта и повседневной жизни.",
    },
    {
      title: "Высокие стандарты качества",
      description:
        "Продукция с передовыми технологиями, обеспечивающая максимальный комфорт и поддержку. Качество, которому можно доверять.",
    },
    {
      title: "Быстрая доставка прямо к вам",
      description:
        "Мы доставим ваш заказ по Кыргызстану в кратчайшие сроки, чтобы вы могли наслаждаться покупками уже сегодня.",
    },
  ];
  return (
    <Container>
      <div className={styles.textPart}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </Container>
  );
};
