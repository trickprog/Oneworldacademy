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
import { useParams } from "react-router-dom";
import { db } from "../config";
import Header from "../components/Header";
import "../styles/quiz.css";
export default function Quiz() {
  const { playlistid, course, courseid, uservideoid } = useParams();
  const [questions, setquestions] = useState([]);
  const getquestions = async () => {
    const ref = collection(db, `${course}/${courseid}/questions`);
    const gettingdata = await getDocs(ref);
    setquestions(
      gettingdata.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  console.log(questions);

  useEffect(() => {
    getquestions();
  }, []);
  return (
    <>
      <Header />
      <div style={{ marginTop: 200 }}>
        <h3>QUIZ </h3>
        {questions.map((val, ind) => (
          <div>
            <h4 className="questions">Question {ind+1} {val.questions}</h4>
            <div className="mcq">
              <input type="checkbox"  />
              <label > {val.answers[0]}</label>
            </div>
            <div className="mcq">
              <input type="checkbox"  />
              <label >{val.answers[1]}</label>
            </div>
            <div className="mcq">
              <input type="checkbox"  />
              <label > {val.answers[2]}</label>
            </div>
            <div className="mcq">
              <input type="checkbox"  />
              <label > {val.answers[3]}</label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
