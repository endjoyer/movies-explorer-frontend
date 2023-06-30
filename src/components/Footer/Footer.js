function Footer() {
  return (
    <footer className="footer">
      <p className="footer__header">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__content">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <nav className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/endjoyer" className="footer__link">
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
