import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import Card from "../components/Card";
import styles from "../styles/courses.module.css";
import React, { useState, useEffect } from "react";
import webImg from "../assets/webImg.jpg";
import mlImg from "../assets/mlImg.jpg";
import uxImg from "../assets/uxImg.jpg";
import programImg from "../assets/programImg.jpg";
import Header from "../components/Header";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

const FreeCourses = (props) => {
  const navigate = useNavigate();
  const [courses, setcourses] = useState([]);
  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
    getcourses();
    getusersid();
  }, []);
  const getcourses = async () => {
    const ref = collection(db, "courses");
    const gettingdata = await getDocs(ref);
    console.log(gettingdata);
    setcourses(gettingdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  let userid = "";
  const getusersid = async () => {
    const id = localStorage.getItem("Uid");
    const ref = query(collection(db, "users"), where("userid", "==", id));
    const gettingdata = await getDocs(ref);
    console.log(gettingdata);
    setuserdata(gettingdata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
 
if(userdata.length!==0)
{
  localStorage.setItem("userid", userdata[0].id);
}
 

  const valid = localStorage.getItem("email");

  return (
    <>
      <div className={styles.courses + ""}>
        <Header />
        <h1 className={styles.pageTitle}>Our Courses</h1>
        <p>
          We have a variety of courses related to any of desiring discilpine
          rather its a heavy skill set or a raw concept of any aspect
        </p>

        {valid !== null ? (
          <div className={styles.highlighted + " container-center"}>
            {courses.map((val, ind) => {
              return (
                <NavLink
                  key={ind}
                  to={`/course/courses/${val.playlistlink}/${val.id}/${userdata[0].videoid}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card>
                    <img src={val.backimg} alt=""></img>
                    <h4 className={styles.title}>{val.title}</h4>
                    <p className={styles.description}>{val.description}</p>
                    <span className={styles.price}>{val.price}</span>
                  </Card>
                </NavLink>
              );
            })}

            {/* <NavLink
          to="/course/PL55BQjLK6ZmhszWuypQ2kIjE9As2wrUIC"
          style={{ textDecoration: "none" }}
        >
          <Card onClick={openCourse}>
            <img src={webImg} alt=""></img>
            <h4 className={styles.title}>Web Development</h4>
            <p className={styles.description}>
              A very very good Web Development course indeed. Good very good.
            </p>
            <span className={styles.price}>Free</span>
          </Card>
        </NavLink> */}
          </div>
        ) : (
          <div className={styles.highlighted + " container-center"}>
            {courses.map((val, ind) => {
              return (
                <NavLink
                  key={ind}
                  to={`/course/courses/${val.playlistlink}/${val.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card>
                    <img src={val.backimg} alt=""></img>
                    <h4 className={styles.title}>{val.title}</h4>
                    <p className={styles.description}>{val.description}</p>
                    <span className={styles.price}>{val.price}</span>
                  </Card>
                </NavLink>
              );
            })}

            {/* <NavLink
          to="/course/PL55BQjLK6ZmhszWuypQ2kIjE9As2wrUIC"
          style={{ textDecoration: "none" }}
        >
          <Card onClick={openCourse}>
            <img src={webImg} alt=""></img>
            <h4 className={styles.title}>Web Development</h4>
            <p className={styles.description}>
              A very very good Web Development course indeed. Good very good.
            </p>
            <span className={styles.price}>Free</span>
          </Card>
        </NavLink> */}
          </div>
        )}

        <h2>Courses in Demand</h2>
        <p>
          Based on our user reviews and quality of content, below is the list of
          top courses in demand
        </p>
        {valid !== null ? (
          <div className={styles.highlighted + " container-center"}>
            {courses.map((val, ind) => {
              if (val.coursedemand >= 10) {
                let rate = val.rating;
                console.log(rate);
                return (
                  <NavLink
                    key={ind}
                    to={`/course/courses/${val.playlistlink}/${val.id}/${userdata[0].videoid}`}
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
        ) : (
          <div className={styles.highlighted + " container-center"}>
            {courses.map((val, ind) => {
              if (val.coursedemand >= 10) {
                let rate = val.rating;
                console.log(rate);
                return (
                  <NavLink
                    key={ind}
                    to={`/course/courses/${val.playlistlink}/${val.id}`}
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
        )}

        <h2>Affordabale Packages</h2>
        <div className={styles.highlighted + " container-center"}>
          <Card
            style={{
              width: "350px",
              height: "450px",
              backgroundImage:
                "linear-gradient(to bottom right, yellow, orange)",
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
              backgroundImage:
                "linear-gradient(to bottom right, yellow, orange)",
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
              backgroundImage:
                "linear-gradient(to bottom right, yellow, orange)",
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
    </>
  );
};

export default FreeCourses;
