function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://github.com/endjoyer/react-mesto-api-full-gha"
            className="portfolio__link"
          >
            <p className="portfolio__name">Одностраничное приложение - Mesto</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/endjoyer/ya-pack-solution"
            className="portfolio__link"
          >
            <p className="portfolio__name">Приложение в рамках хакатона</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/endjoyer/neural-networks"
            className="portfolio__link"
          >
            <p className="portfolio__name">
              Дипломный сайт - Нейросети в искусстве
            </p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/endjoyer/how-to-learn"
            className="portfolio__link"
          >
            <p className="portfolio__name">
              Статичный сайт - Научиться учиться
            </p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/endjoyer/russian-travel"
            className="portfolio__link"
          >
            <p className="portfolio__name">
              Адаптивный сайт - Путешествие по России
            </p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
