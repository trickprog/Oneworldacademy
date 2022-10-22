import Carousel from "../components/Carousel";
import Header from "../components/Header";
import background1 from "../assets/backgroundImg";
import background2 from "../assets/background2.jpg";
import background3 from "../assets/background3.jpg";
import background4 from "../assets/background4.jpg";
import styles from "../styles/home.module.css";

const Home = (props) => {
  const slides = [background1, background2, background3, background4];

  return (
    <div className={styles.home}>
      <div className={styles.background}>
        <Carousel slides={slides} />
      </div>

      <Header />
      <div className={styles.content + " container-center"}>
        <div className={styles.searchBar}>
          <input placeholder="Get Started..." />
        </div>
        <p className={styles.headline}>Initiate Learning with us!</p>
        <p className={styles.summary}>
          Our Platform provides you with all of your desired courses with up to
          dated knowledge and technical aspects in order to give a boost to your
          skill set to make you a leading individual in competitive environments
        </p>
      </div>
    </div>
  );
};

export default Home;
