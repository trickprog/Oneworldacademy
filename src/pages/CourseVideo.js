import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import styles from "../styles/courseVideo.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ReactPlayer from "react-player/youtube";


export default function CourseVideo() {

  const navigate = useNavigate();
 
  const openCourse = () => navigate("/login");
  const loginchk = localStorage.getItem("email");
  const [video, setvideo] = useState([]);
  const [videoid, setvideoid] = useState("");
  const [videotumbnail, setvideotumbnail] = useState("");
  const comments = [{ text: "Hello This is a comment", author: "User123" }];
  const videos = [{ description: "This is another video" }];
  const { playlistid } = useParams();
  const key = "AIzaSyDHBFveODGxnW5l0FdQIcHq6bJR1EMJXjA";


  


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


  const videoswitch = (id) => {
    console.log(id);
    setvideoid(id[0]);
    setvideotumbnail(id[1]);
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


let rnd=Math.random() < 0.5;


  useEffect(() => {
    getvideos();

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
                onEnded={appendvideo}
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
{       rnd===false?   <div className={styles.commentSection}>
            <h2>Comments</h2>
            {comments.map((comment) => {
              return (
                <div className={styles.comment}>
                  <span>{comment.author}</span>
                  <p>{comment.text}</p>
                </div>
              );
            })}
          </div>:
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
          </div>}
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
