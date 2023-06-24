import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import styles from './BackToTop.module.css'

const BackToTop = () => {
  
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.topBtn}>
      {showButton && (
        <FaAngleUp
         className={`${styles.iconPos} ${styles.toTopBtn}`}
         onClick={goToTop}/>
      )}
    </div>
  )
}

export default BackToTop