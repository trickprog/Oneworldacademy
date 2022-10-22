import styles from "../styles/videoCard.module.css";

const Card = (props) => {
  return (
    <div className={styles.card} style={props.style} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;
