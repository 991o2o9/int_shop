import { Container } from "../../../../../ui/Container/Container";
import styles from "../../HeroBlock.module.scss";

export const Textpart = () => {
  const data = [
    {
      title: "Широта ассортимента",
      description:
        "У нас можно приобрести товар от лучших производителей Кыргызстана.",
    },
    {
      title: "Высокие стандарты качества",
      description:
        "У нас можно приобрести товар от лучших производителей Кыргызстана.",
    },
    {
      title: "Оперативная доставка товара",
      description:
        "Мы доставим товар в любой регион России. С которым мы работаем в течении двух недель.",
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
