import styles from "./Header.module.css";
import Image from "next/image";
import Logo from "@/assetst/svg/logo.svg";
import Button from "../Button/Button";
import LangButton from "../Button/LangButton";
import ThemeButton from "../Button/ThemeButton";

const Header = () => {
  return (
    <div className={styles.header}>
      <Image className={styles.logo} src={Logo} alt="logo" />
      <div className={styles.nav}>
        <Button>Обмен</Button>
        <LangButton>EN</LangButton>
        <ThemeButton>☀︎</ThemeButton>
      </div>
    </div>
  );
};

export default Header;
