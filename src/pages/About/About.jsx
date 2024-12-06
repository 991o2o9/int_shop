import { Container } from "../../ui/Container/Container";
import styles from "./AboutUs.module.scss";

export const About = () => {
  return (
    <div className="container">
      <Container>
        <div className={styles.aboutUs}>
          <section className={styles.headingSection}>
            <h1 className={styles.title}>О компании Nike</h1>
            <p className={styles.description}>
              Nike, Inc. — мировой лидер в области спортивной одежды, создающий
              инновационные продукты, которые вдохновляют спортсменов по всему
              миру. Мы разрабатываем обувь, одежду и оборудование, которые
              расширяют границы спортивных достижений.
            </p>
          </section>

          <section className={styles.missionSection}>
            <h2 className={styles.subtitle}>Наша миссия</h2>
            <p className={styles.missionText}>
              Вдохновлять и привносить инновации для каждого спортсмена в мире.
              Если у вас есть тело, вы — спортсмен.
            </p>
          </section>

          <section className={styles.historySection}>
            <h2 className={styles.subtitle}>Наша история</h2>
            <p className={styles.historyText}>
              Основанная в 1964 году, Nike изменила спортивную индустрию
              благодаря революционным технологиям, культовым продуктам и
              приверженности устойчивому развитию. Наш путь продолжается с целью
              формировать будущее спорта.
            </p>
          </section>

          <section className={styles.valuesSection}>
            <h2 className={styles.subtitle}>Наши ценности</h2>
            <ul className={styles.valuesList}>
              <li className={styles.valueItem}>Инновации</li>
              <li className={styles.valueItem}>Устойчивое развитие</li>
              <li className={styles.valueItem}>Инклюзивность</li>
              <li className={styles.valueItem}>Превосходство</li>
            </ul>
          </section>
        </div>
      </Container>
    </div>
  );
};
