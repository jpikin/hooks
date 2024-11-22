import { useEffect, useRef, useState } from "react";
import classes from "./App.module.css";
import Buttons from "./components/Buttons";

const App = () => {
  const [color, setColor] = useState('aqua');
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const popupRef = useRef(null); 

  function chColor() {
    color === 'aqua' ? setColor('aquamarine') : setColor('aqua');
  }

  function togglePopup() {
    setIsPopupOpen(true);
  }

  
  function handleClickOutside(event) {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', chColor);
    document.body.style.backgroundColor = color;
    document.querySelector(`.${classes.link}`).addEventListener('click', togglePopup);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('click', chColor);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [color, isPopupOpen]);

  return (
    <div className={classes.app}>
      <h2 className={classes.title}>CSS Module Buttons</h2>
      <div className={classes.wrapper}>
        <Buttons />
      </div>
      <a href="#" className={classes.link}>Открыть окошко</a>
      <div
        ref={popupRef}
        className={`${classes.popup} ${isPopupOpen ? classes.show : ''}`}
      ></div>
    </div>
  );
};

export default App;