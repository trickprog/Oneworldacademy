import styles from "../styles/dropdownMenu.module.css";

const DropdownMenu = (props) => {
  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.dropdownMenuContent}>{props.children}</div>
    </div>
  );
};

export default DropdownMenu;
