import css from "./Button.module.css"

const Button =({description}) => {
    return (
        <>
            <button className={css.btn} type="submit">{description}</button>
        </>
    );
}

export default Button;