import "./Popup.css";

const Popup = ({ text }) => {
  return (
    <div className="popup">
      <p className="popup__text">{text}</p>
    </div>
  );
};

export default Popup;
