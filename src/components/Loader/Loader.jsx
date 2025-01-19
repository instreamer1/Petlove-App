import css from './Loader.module.css';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false); 
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLogo) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval); 
            return 100;
          }
          return prev + 1; 
        });
      }, 50); 

      return () => clearInterval(interval);
    }
  }, [showLogo]);

  return (
    <div className={css.overlay}>
      {showLogo ? (
        <div className={css.logo}>
          <h2 className={css.text}>
            petl
            <svg className={css.icon}>
              <use href="#heart"></use>
            </svg>
            ve
          </h2>
        </div>
      ) : (
        <div className={css.progress}>
          <p className={css.percentage}>{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default Loader;