import { useState, useEffect } from "react";
import styles from "./alert.module.css";

const Alert = ({ children }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      const timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      setTimeoutId(timeoutId);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showPopup]);

  return (
    <>
      {showPopup && (
        <div className={styles.errorPopup}>
          <div className={styles.errorPopupContent}>
            <p>{children}</p>
            <button onClick={closePopup}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
