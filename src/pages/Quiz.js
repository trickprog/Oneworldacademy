import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config";
import Header from "../components/Header";
import "../styles/quiz.css";
export default function Quiz() {
  const navigate = useNavigate();
  const { playlistid, course, courseid, quiznumber } = useParams();
  const [questions, setquestions] = useState([]);
  const [answers, setanswers] = useState([]);
  const getquestions = async () => {
    const ref = collection(db, `${course}/${courseid}/questions`);
    const gettingdata = await getDocs(ref);
    if (quiznumber === "1") {
      setquestions(
        gettingdata.docs
          .slice(0, 20)
          .map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    if (quiznumber === "2") {
      setquestions(
        gettingdata.docs
          .slice(20, 39)
          .map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  };

  const handlechange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    console.log(value, checked);
    if (checked) {
      setanswers([...answers, value]);
    } else {
      setanswers(answers.filter((event) => event !== value));
    }
  };
  const SubmitAnswers = async () => {
    const found = questions.filter((val, index) => {
      console.log("index", index);
      return answers.includes(val.correctAnswer);
    });
    const id = localStorage.getItem("userid");
    const ref = doc(db, "users", id);
    let object = {};
    if (quiznumber === "1") {
      object = {
        quiz1: found.length,
        videoid: "",
      };
    }
    if (quiznumber === "2") {
      object = {
        quiz2: found.length,
        completed:true,
        videoid: "",
      };
    }
    await updateDoc(ref, object);
   navigate('/free-courses')
  };


  useEffect(() => {
    getquestions();
  }, []);
  return (
    <>
      <Header />
      <div style={{ marginTop: 200 }}>
        <h3>QUIZ </h3>
        {questions.map((val, ind) => {
          return (
            <div>
              <h4 className="questions">
                Question {ind + 1} {val.questions}
              </h4>
              <div className="mcq">
                <input
                  type="checkbox"
                  name={ind + 1}
                  onChange={handlechange}
                  value={val.answers[0]}
                />
                <label> {val.answers[0]}</label>
              </div>
              <div className="mcq">
                <input
                  type="checkbox"
                  name={ind + 1}
                  onChange={handlechange}
                  value={val.answers[1]}
                />
                <label>{val.answers[1]}</label>
              </div>
              <div className="mcq">
                <input
                  type="checkbox"
                  name={ind + 1}
                  onChange={handlechange}
                  value={val.answers[2]}
                />
                <label> {val.answers[2]}</label>
              </div>
              <div className="mcq">
                <input
                  type="checkbox"
                  name={ind + 1}
                  onChange={handlechange}
                  value={val.answers[3]}
                />
                <label> {val.answers[3]}</label>
              </div>
            </div>
          );
        })}
        <button
          onClick={SubmitAnswers}
          style={{
            margin: 80,
            marginLeft: 50,
            padding: 10,
            borderRadius: 5,
            fontWeight: "bold",
            backgroundColor: "grey",
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
