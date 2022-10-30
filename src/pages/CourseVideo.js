import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import styles from "../styles/courseVideo.module.css";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
export default function CourseVideo(props) {
  const navigate = useNavigate();
  const [chkquiz, setchkquiz] = useState(false);
  const openCourse = () => navigate("/login");
  const loginchk = localStorage.getItem("email");
  const [video, setvideo] = useState([]);

  const [user, setuser] = useState([]);
  const [videoid, setvideoid] = useState("");
  const [videotumbnail, setvideotumbnail] = useState("");
  const [quiznumber, setquiznumber] = useState("");
  const comments = [{ text: "Hello This is a comment", author: "User123" }];
  const videos = [{ description: "This is another video" }];

  const { playlistid, course, courseid } = useParams();

  const key = "AIzaSyDHBFveODGxnW5l0FdQIcHq6bJR1EMJXjA";

  const getusersid = async () => {
    const id = localStorage.getItem("Uid");
    const ref = query(collection(db, "users"), where("userid", "==", id));
    const gettingdata = await getDocs(ref);
    setuser(gettingdata.docs.map((doc) => doc.data()));
  };

  const getvideos = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistid}&key=${key}`
      )
      .then((video) => {
        setvideoid(video.data.items[0].snippet.resourceId.videoId);
        setvideo(video.data.items);
        setvideotumbnail(video.data.items[0].snippet.thumbnails.standard.url);
      });
  };

  const videoswitch = (id) => {
    setvideoid(id[0]);
    setvideotumbnail(id[1]);
  };

  const appendvideo = () => {
    for (let i = 0; i < video.length; i++) {
      if (videoid === video[i].snippet.resourceId.videoId) {
        let lastElement = video[video.length - 1];
        if (
          lastElement.snippet.resourceId.videoId ===
          video[i].snippet.resourceId.videoId
        ) {
          setvideoid(video[i].snippet.resourceId.videoId);
          addvideoid(video[i].snippet.resourceId.videoId);
        } else {
          i++;
          setvideoid(video[i].snippet.resourceId.videoId);
          addvideoid(video[i].snippet.resourceId.videoId);
        }

        break;
      }
    }
  };

  const addvideoid = async (videoid) => {
    console.log('moiz')
    const id = localStorage.getItem("userid");
    const ref = doc(db, "users", id);
    await updateDoc(ref, {
      videoid: videoid,
    });
  };

  const createPdf = async () => {
    const exbytes = await fetch(certificate)
      .then((res) => {
        return res.arrayBuffer();
      })
      .catch((err) => {
        console.log(err);
      });

    const pdfDoc = await PDFDocument.load(exbytes);

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    const fontSize = 30;
    const fontSizeSub = 15;
    const Name = user[0].name;
    const course = "Web Development";
    firstPage.drawText(Name, {
      x: 250,
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
  }, []);
  const quizupdate = () => {
    console.log("quiz call");
    console.log(user[0].videoid);
    console.log(video[4].snippet.resourceId.videoId);
    if (user[0].videoid === video[4].snippet.resourceId.videoId) {
      setchkquiz(true);
      setquiznumber("1");
    }

    if (user[0].videoid === video[9].snippet.resourceId.videoId) {
      setchkquiz(true);
      setquiznumber("2");
    }
  };

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
              <>
                {chkquiz === true ? (
                  <>
                    <div className={styles.videodiv}>
                      <div className={styles.cardlogin}>
                        <div className={styles.cardback}>
                          <h1>Attempt Your Quiz </h1>

                          <NavLink
                            to={`/course/${course}/${playlistid}/${courseid}/${user[0].videoid}/quiz/${quiznumber}`}
                          >
                            <button onClick={openCourse}>Take Quiz</button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <img src={videotumbnail} style={{ border: "none" }} />
                  </>
                ) : (
                  <>
                    {user.length !== 0 ? (
                      <>
                        <ReactPlayer
                          controls={true}
                          onReady={() => {
                            getusersid();
                            quizupdate();
                          }}
                          onStart={() => {
                            getusersid();
                            quizupdate();
                          }}
                          onEnded={() => {
                            appendvideo();
                            quizupdate();
                          }}
                          allowfullscreen="allowfullscreen"
                          width="100%"
                          height="100%"
                          url={`https://www.youtube.com/watch?v=${videoid}`}
                        />
                        {user[0].quiz1!==undefined ? (
                          <div>
                            <h1>Quiz 1 marks {user[0].quiz1}/20</h1>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        {user[0].quiz2!==undefined ? <div> <h1>Quiz 2 marks {user[0].quiz2}/20</h1></div> : <div></div>}

                        {user[0].completed === true ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              marginTop: 10,
                            }}
                          >
                            {" "}
                            <button
                              style={{
                                padding: 10,
                                borderRadius: 5,
                                fontWeight: "bold",
                                backgroundColor: "grey",
                              }}
                              onClick={createPdf}
                            >
                              Generate Certificate
                            </button>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                  </>
                )}
              </>
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
            <h2>Comments</h2>

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
