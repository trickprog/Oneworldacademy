import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import styles from "../styles/courseVideo.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ReactPlayer from "react-player/youtube";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import certificate from "../assets/certificate.pdf";
import { Document, Page } from "react-pdf";
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
import { db } from "../config";
import { IoVolumeMediumOutline } from "react-icons/io5";
export default function CourseVideo() {
  const navigate = useNavigate();

  const openCourse = () => navigate("/login");
  const loginchk = localStorage.getItem("email");
  const [video, setvideo] = useState([]);
  const [questions, setquestions] = useState([]);
  const [user, setuser] = useState([]);
  const [videoid, setvideoid] = useState("");
  const [videotumbnail, setvideotumbnail] = useState("");
  const comments = [{ text: "Hello This is a comment", author: "User123" }];
  const videos = [{ description: "This is another video" }];
  const { playlistid, course, courseid } = useParams();
  const key = "AIzaSyDHBFveODGxnW5l0FdQIcHq6bJR1EMJXjA";
  const [open, setopen] = useState(false);

  const getusersid = async () => {
    const id = localStorage.getItem("Uid");
    const ref = await query(collection(db, "users"), where("userid", "==", id));
    const gettingdata = await getDocs(ref);
    const data = gettingdata.docs;
    setuser(data.map((doc) => ({ ...doc.data(), id: doc.id })));
    quizshow();
  };

  const getvideos = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistid}&key=${key}`
      )
      .then((video) => {
        setvideo(video.data.items);
        setvideoid(video.data.items[0].snippet.resourceId.videoId);
        setvideotumbnail(video.data.items[0].snippet.thumbnails.standard.url);
      });
  };

  const getquestions = async () => {
    const ref = collection(db, `${course}/${courseid}/questions`);
    const gettingdata = await getDocs(ref);
    setquestions(
      gettingdata.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const videoswitch = (id) => {
    console.log(id);
    setvideoid(id[0]);
    setvideotumbnail(id[1]);
  };

  const quizshow = () => {
    if (user[0].videoid === video[5].snippet.resourceId.videoId) {
      setopen(true);
    }
  };

  const appendvideo = () => {
    for (let i = 0; i < video.length; i++) {
      if (videoid === video[i].snippet.resourceId.videoId) {
        i++;
        setvideoid(video[i].snippet.resourceId.videoId);
        break;
      }
    }
  };

  const addvideoid = async () => {
    console.log(videoid);
    const ref = doc(db, "users", user[0].id);
    await updateDoc(ref, {
      videoid: videoid,
    });
  };

  const createPdf = async () => {
    console.log("moiz");
    console.log(certificate);
    const exbytes = await fetch(certificate)
      .then((res) => {
        return res.arrayBuffer();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(exbytes);
    const pdfDoc = await PDFDocument.load(exbytes);
    console.log(pdfDoc);

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const fontSize = 30;
    const fontSizeSub = 15;
    const Name = "Your Full Name";
    const course = "C++ Programming ";
    firstPage.drawText(Name, {
      x: 300,
      y: height - 11.2 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
    firstPage.drawText(course, {
      x: 310.5,
      y: height - 13.43 * fontSize,
      size: fontSizeSub,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.saveAsBase64();
    console.log(pdfBytes);
    downloadPDF(pdfBytes);
  };

  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // let rnd = Math.random() < 0.5;

  useEffect(() => {
    getusersid();
    getvideos();
    getquestions();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.courseVideo} style={{ marginTop: 200 }}>
        <div className={styles.container}>
          <div className={styles.video}>
            {!loginchk ? (
              <>
                <div className={styles.videodiv}>
                  <div className={styles.cardlogin}>
                    <div className={styles.cardback}>
                      <h1>Login To Access</h1>
                      <button onClick={openCourse}>Login</button>
                    </div>
                  </div>
                </div>
                <img src={videotumbnail} style={{ border: "none" }} />
              </>
            ) : (
              <ReactPlayer
                controls={true}
                onEnded={() => {
                  appendvideo();
                  addvideoid();
                  quizshow();
                }}
                allowfullscreen="allowfullscreen"
                width="100%"
                height="100%"
                url={`https://www.youtube.com/watch?v=${videoid}`}
              />
              // <iframe

              //   title="video"
              //
              //
              //   src={`https://www.youtube.com/embed/`}
              //   style={{ border: "none",  }}
              //   allowfullscreen="allowfullscreen"
              //   onEnded={()=>appendvideo}
              // ></iframe>
            )}
          </div>

          {/* {rnd === false ? ( */}
          <div className={styles.commentSection}>
            {open === true ? (
              <button onClick={createPdf}>Take Quiz</button>
            ) : (
              <div></div>
            )}
            <h2>Comments</h2>
            <button onClick={createPdf}>Create PDF</button>
            {comments.map((comment) => {
              return (
                <div className={styles.comment}>
                  <span>{comment.author}</span>
                  <p>{comment.text}</p>
                </div>
              );
            })}
          </div>

          {/* ) : (
            <div className={styles.commentSection}>
              <h2>Chat Box</h2>
              {comments.map((comment) => {
                return (
                  <div className={styles.comment}>
                    <span>{comment.author}</span>
                    <p>{comment.text}</p>
                  </div>
                );
              })}
            </div>
          )} */}
        </div>
        <div className={styles.playlist}>
          {video.map((val, ind) => {
            if (val.snippet.resourceId.videoId !== videoid) {
              return (
                <VideoCard
                  key={ind}
                  onClick={() =>
                    videoswitch([
                      val.snippet.resourceId.videoId,
                      val.snippet.thumbnails.standard.url,
                    ])
                  }
                >
                  <img src={val.snippet.thumbnails.standard.url} alt="abc" />
                  <div>{val.snippet.title}</div>
                  <div>{val.snippet.description}</div>
                </VideoCard>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
