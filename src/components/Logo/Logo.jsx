import css from './Logo.module.css'
import iconSprite from '../../assets/sprite.svg'

const Logo =() =>{
    return (
        <a href="/" className={css.logoWrapper}>
              <p className={css.text} >petl<svg className={css.icon}>
            <use href={`${iconSprite}#heart`}></use>
          </svg>ve</p>
        </a>
    );
}

export default Logo;
