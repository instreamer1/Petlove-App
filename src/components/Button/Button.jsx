import css from "./Button.module.css"

const Button =({description}) => {
    return (
        <div>
            <button className={css.btn} type="submit">{description}</button>
        </div>
    );
}

export default Button;