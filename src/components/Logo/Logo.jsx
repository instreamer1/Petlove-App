import css from './Logo.module.css'
import iconSprite from '../../assets/sprite.svg'

const Logo =({isHomePage}) =>{

    return (
        <a href="/" className={css.logoWrapper}>
              <p className={`${isHomePage ? css.text : css.otherPage}`}>petl<svg className={`${isHomePage ? css.iconHome : css.icon}`}>
            <use href={`${iconSprite}#heart`}></use>
          </svg>ve</p>
        </a>
    );
}

export default Logo;
