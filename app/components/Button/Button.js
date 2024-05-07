import styles from "./Button.module.css";
import cn from "classnames";

const Button = ({onClick, type, children, className }) => {
  return (
    <button onClick={onClick} type={type} className={cn(styles["button"], styles[className])}>
      {children}
    </button>
  );
};

export default Button;
