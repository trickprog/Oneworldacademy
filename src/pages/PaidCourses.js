import { NavLink, useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import Card from "../components/Card";
import styles from "../styles/courses.module.css";
import React, { useState, useEffect } from "react";
import webImg from "../assets/webImg.jpg";
import mlImg from "../assets/mlImg.jpg";
import uxImg from "../assets/uxImg.jpg";
import programImg from "../assets/programImg.jpg";
import Header from "../components/Header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import StripeCheckout from "react-stripe-checkout";
const PaidCourses = (props) => {
  const navigate = useNavigate();

  const [courses, setcourses] = useState([]);
  const getcourses = async () => {
    const ref = collection(db, "paidcourses");
    const gettingdata = await getDocs(ref);
    console.log(gettingdata);
    setcourses(gettingdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getcourses();
  }, []);

  return (
    <div className={styles.courses + ""}>
      <Header />
      <h1 className={styles.pageTitle}>Our Courses</h1>
      <p>
        We have a variety of courses related to any of desiring discilpine
        rather its a heavy skill set or a raw concept of any aspect
      </p>

      <div className={styles.highlighted + " container-center"}>
        {courses.map((val, ind) => {
          return (
            <NavLink
              key={ind}
              to={`/course/paidcourses/${val.playlistlink}/${val.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <img src={val.backimg} alt=""></img>
                <h4 className={styles.title}>{val.title}</h4>
                <p className={styles.description}>{val.description}</p>
                <span className={styles.price}>$ {val.price}</span>
              </Card>
            </NavLink>
          );
        })}
      </div>

      <h2>Courses in Demand</h2>
      <p>
        Based on our user reviews and quality of content, below is the list of
        top courses in demand
      </p>
      <div className={styles.highlighted + " container-center"}>
        {courses.map((val, ind) => {
          if (val.coursedemand >= 10) {
            let rate = val.rating;
            console.log(rate);
            return (
              <NavLink
                key={ind}
                to={`/course/${val.playlistlink}/${val.id}`}
                style={{ textDecoration: "none" }}
              >
                {" "}
                <Card>
                  <img src={val.backimg} alt=""></img>
                  <h4 className={styles.courseTitle}>{val.title}</h4>
                  <span className={styles.rating}>
                    {rate >= 1 ? <IoStar /> : <div></div>}
                    {rate >= 2 ? <IoStar /> : <div></div>}
                    {rate >= 3 ? <IoStar /> : <div></div>}
                    {rate >= 4 ? <IoStar /> : <div></div>}
                    {rate >= 5 ? <IoStar /> : <div></div>}
                  </span>
                  <span className={styles.reviews}>{val.coursedemand}</span>
                </Card>
              </NavLink>
            );
          }
        })}
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
          <StripeCheckout stripeKey={process.env.REACT_APP_STRIPE_KEY} token="" amount={300*100} name="Buy Package">
            <button className={styles.packageButton}>Buy Now</button>
          </StripeCheckout>
        </Card>
      </div>
    </div>
  );
};

export default PaidCourses;
