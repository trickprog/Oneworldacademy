import { NavLink, useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import Card from "../components/Card";
import styles from "../styles/courses.module.css";

import webImg from "../assets/webImg";
import mlImg from "../assets/mlImg";
import uxImg from "../assets/uxImg";
import programImg from "../assets/programImg";
import Header from "../components/Header";

const PaidCourses = (props) => {
  const navigate = useNavigate();

  const openCourse = () => navigate("/course");

  return (
    <div className={styles.courses + ""}>
      <Header />
      <h1 className={styles.pageTitle}>Our Courses</h1>    
      <p>
        We have a variety of courses related to any of desiring discilpine
        rather its a heavy skill set or a raw concept of any aspect
      </p>

      <div className={styles.highlighted + " container-center"}>
        <NavLink
          to="/course/PL55BQjLK6ZmiU7GlaWHac2kSeFMZ15hfU"
          style={{ textDecoration: "none" }}
        >
          {" "}
          <Card onClick={openCourse}>
            <img src={mlImg} alt=""></img>
            <h4 className={styles.title}>Machine Learning</h4>
            <p className={styles.description}>
              A very very good Machine Learning course indeed. Good very good. A
              very very good Machine Learning course indeed. Good very good. A
              very very good Machine Learning course indeed. Good very good.
            </p>
            <span className={styles.price}>200$</span>
          </Card>
        </NavLink>

        <NavLink
          to="/course/PL55BQjLK6Zmg_6X9DLVWvubwIXXZj6E-j"
          style={{ textDecoration: "none" }}
        >
          {" "}
          <Card onClick={openCourse}>
            <img src={webImg} alt=""></img>
            <h4 className={styles.title}>Web Development</h4>
            <p className={styles.description}>
              A very very good Web Development course indeed. Good very good.
            </p>
            <span className={styles.price}>300$</span>
          </Card>
        </NavLink>
      </div>

      <h2>Courses in Demand</h2>
      <p>
        Based on our user reviews and quality of content, below is the list of
        top courses in demand
      </p>
      <div className={styles.highlighted + " container-center"}>
        <NavLink
          to="/course/PL55BQjLK6ZmiYObtWGhyY8QZx0WlbwIVo"
          style={{ textDecoration: "none" }}
        >
          {" "}
          <Card onClick={openCourse}>
            <img src={uxImg} alt=""></img>
            <h4 className={styles.courseTitle}>Graphic Designing</h4>
            <span className={styles.rating}>
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </span>
            <span className={styles.reviews}>10,8845</span>
            <span className={styles.price}>200$</span>
          </Card>
        </NavLink>
        <NavLink
          to="/course/PL55BQjLK6ZmitKdRr2OsqUSIGmwRDZZei"
          style={{ textDecoration: "none" }}
        >
          {" "}
          <Card onClick={openCourse}>
            <img src={programImg} alt=""></img>
            <h4 className={styles.courseTitle}>C++ Programming</h4>
            <span className={styles.rating}>
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </span>
            <span className={styles.reviews}>10,9343</span>
            <span className={styles.price}>200$</span>
          </Card>
        </NavLink>
        <NavLink
          to="/course/PL55BQjLK6ZmhY2ZihX1eq_TrlfibZbVzg"
          style={{ textDecoration: "none" }}
        >
          {" "}
          <Card onClick={openCourse}>
            <img src={webImg} alt=""></img>
            <h4 className={styles.courseTitle}>Java</h4>
            <span className={styles.rating}>
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </span>
            <span className={styles.reviews}>10,9345</span>
            <span className={styles.price}>200$</span>
          </Card>
        </NavLink>
      </div>
      <h2>Affordabale Packages</h2>
      <div className={styles.highlighted + " container-center"}>
        <Card
          style={{
            width: "350px",
            height: "450px",
            backgroundImage: "linear-gradient(to bottom right, yellow, orange)",
          }}
        >
          <h4>$300</h4>
          <p className={styles.package}>Two year standard access</p>
          <p className={styles.package}>Limited Courses</p>
          <p className={styles.package}>Complete Lectures</p>
          <p className={styles.package}>Helping Notes</p>
          <p className={styles.package}>AI Assistance</p>
          <p className={styles.package}>Teacher Contact</p>
          <button className={styles.packageButton}>Buy Now</button>
        </Card>
        <Card
          style={{
            width: "350px",
            height: "450px",
            backgroundImage: "linear-gradient(to bottom right, yellow, orange)",
          }}
        >
          <h4>Free</h4>
          <p className={styles.freePackage}>Get Access to our free courses</p>
          <button className={styles.packageButton}>Sign In</button>
        </Card>
        <Card
          style={{
            width: "350px",
            height: "450px",
            backgroundImage: "linear-gradient(to bottom right, yellow, orange)",
          }}
        >
          <h4>$300</h4>
          <p className={styles.package}>One your standard access</p>
          <p className={styles.package}>Limited Courses</p>
          <p className={styles.package}>Complete Lectures</p>
          <p className={styles.package}>AI Assistance</p>
          <button className={styles.packageButton}>Buy Now</button>
        </Card>
      </div>
    </div>
  );
};

export default PaidCourses;
