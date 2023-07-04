import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject({ aboutProjectRef }) {
  return (
    <section className="about-project" ref={aboutProjectRef}>
      <SectionTitle title="О проекте" />
      <div className="about-project__columns">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__time-parts">
        <div>
          <div className="about-project__band about-project__band_green">
            1 неделя
          </div>
          <p className="about-project__activity">Back-end</p>
        </div>
        <div>
          <div className="about-project__band">4 недели</div>
          <p className="about-project__activity">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
