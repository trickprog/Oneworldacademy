import Header from "../components/Header";
import Card from "../components/Card";
import teacher1 from "../assets/teacher1";
import teacher2 from "../assets/teacher2";
import socialMedia from "../assets/socialMedia";
import styles from "../styles/teachers.module.css";

const Teachers = (props) => {
  return (
    <div className={styles.teachers}>
      <Header />
      <h1 className={styles.pageTitle}>Our Teachers</h1>
      <div className={styles.container + " container-center"}>
        <Card>
          <img src={teacher1} alt=""></img>
          <h4 className={styles.title}>Dale Johns</h4>
          <p className={styles.description}>
            A very very good Machine Learning course indeed. Good very good. A
            very very good Machine Learning course indeed. Good very good. A
            very very good Machine Learning course indeed. Good very good.
          </p>
          <img className={styles.socialMedia} src={socialMedia} alt=""></img>
        </Card>
        <Card>
          {" "}
          <img src={teacher2} alt=""></img>
          <h4 className={styles.title}>Nathan Peter</h4>
          <p className={styles.description}>
            A very very good Machine Learning course indeed. Good very good. A
            very very good Machine Learning course indeed. Good very good. A
            very very good Machine Learning course indeed. Good very good.
          </p>
          <img className={styles.socialMedia} src={socialMedia} alt=""></img>
        </Card>
      </div>
    </div>
  );
};

export default Teachers;
