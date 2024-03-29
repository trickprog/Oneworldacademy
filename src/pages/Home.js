import Carousel from "../components/Carousel";
import Header from "../components/Header";
import background1 from "../assets/backgroundImg.jpg";
import background2 from "../assets/background2.jpg";
import background3 from "../assets/background3.jpg";
import background4 from "../assets/background4.jpg";
import styles from "../styles/home.module.css";

const Home = (props) => {
  const slides = [background1, background2, background3, background4];

  return (
    <>
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
            Our Platform provides you with all of your desired courses with up
            to dated knowledge and technical aspects in order to give a boost to
            your skill set to make you a leading individual in competitive
            environments
          </p>
        </div>
        {/* <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", bottom: 0, right: 0 }}>
            <iframe
              width="350"
              height="430"
              allow="microphone;"
              src="https://console.dialogflow.com/api-client/demo/embedded/67c35400-87f2-4ab6-a444-045b6e2b9f90"
            ></iframe>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
