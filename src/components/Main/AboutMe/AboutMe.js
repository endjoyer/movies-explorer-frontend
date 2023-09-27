import SectionTitle from '../SectionTitle/SectionTitle';
function getAgeWord(age) {
  if (age >= 5 && age <= 20) {
    return 'лет';
  } else {
    switch (age % 10) {
      case 1:
        return 'год';
      case 2:
      case 3:
      case 4:
        return 'года';
      default:
        return 'лет';
    }
  }
}

function AboutMe({ aboutMeRef }) {
  const calculateAge = () => {
    const diffInMilliseconds = new Date() - new Date('2000-08-23');
    const ageDate = new Date(diffInMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = calculateAge();

  return (
    <section ref={aboutMeRef} className="about-me">
      <SectionTitle title="Студент" />
      <div className="about-me__content">
        <div className="about-me__text">
          <h3 className="about-me__name">Алексей</h3>
          <p className="about-me__profession">
            Фронтенд-разработчик, {age} {getAgeWord(age)}
          </p>
          <p className="about-me__description">
            Я живу в Казани. Люблю музыку, компьютерные игры, фильмы,
            художественную литературу, также люблю ходить на разные мероприятия
            в сфере IT и искусства. 2 года работал в сфере электроэнергетики. Но
            больше года назад уволился и полностью посвятил себя Веб-разработке.
            Недавно, на трехнедельном хакатоне, наша команда, заняла первое
            место. Мне очень нравиться специальность, которую я выбрал, и
            достигаемые в ней успехи.
          </p>
          <a
            href="https://github.com/endjoyer"
            target="_blank"
            rel="noreferrer"
            className="about-me__link"
          >
            Github
          </a>
        </div>
        <div className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;
