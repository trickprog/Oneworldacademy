import styles from "../styles/carousel.module.css";

const CarouselItem = ({ slide }) => {
  return (
    <div className={styles.carouselItem}>
      <img className={styles.carouselImg} src={slide} alt="Background" />
    </div>
  );
};

export default CarouselItem;
