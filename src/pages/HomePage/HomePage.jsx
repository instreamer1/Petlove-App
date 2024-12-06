import css from './HomePage.module.css';
import homeMobile1x from '../../assets/images/homeMobile.jpg';
import homeMobile2x from '../../assets/images/homeMobile@2x.jpg';
import homeDesktop1x from '../../assets/images/homeDesktop.jpg';
import homeDesktop2x from '../../assets/images/homeDesktop@2x.jpg';
import homeTablet1x from '../../assets/images/homeTablet.jpg';
import homeTablet2x from '../../assets/images/homeTablet@2x.jpg';
import imageHome from '../../assets/images/imageHome.jpg'

const HomePage = () => {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.content}>
          <h1 className={css.title}>Take good <span className={css.cara} >care</span> of your small pets</h1>

          <p className={css.description}>
          Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.
          </p>
        </div>
        <div className={css.image}>
          <picture>
      
            <source
              srcSet={`${homeDesktop1x} 1x, ${homeDesktop2x} 2x`}
              media='(min-width: 1280px)'
            />

       
            <source
              srcSet={`${homeTablet1x} 1x, ${homeTablet2x} 2x`}
              media='(min-width: 768px)'
            />

        
            <source
              srcSet={`${homeMobile1x} 1x, ${homeMobile2x} 2x`}
              media='(min-width: 320px)'
            />

        
            <img className={css.img}
              src={imageHome}
              alt='Woman with dog'
              loading='lazy'
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
