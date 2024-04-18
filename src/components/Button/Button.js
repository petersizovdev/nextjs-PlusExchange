import styles from "./Button.module.css";
import cn from "classnames";

const Button = ({ children }) => {
  return (
    <button className={cn(styles["button"], styles["accent"])}>
      {children}
    </button>
  );
};

export default Button;
