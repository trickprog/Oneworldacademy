import React, { useState } from "react";
import style from "../styles/register.css";
import sideimage from "../assets/background2.jpg";
import Header from "../components/Header";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  const [red, setred] = useState("");
  const [errors, seterrors] = useState(false);
  let error = "";
  const login = () => {
 
      signInWithEmailAndPassword( auth,email, password)
        .then((userCredential) => {
          console.log(userCredential.user.uid);
          localStorage.setItem('email',userCredential._tokenResponse.email)
          localStorage.setItem('Uid',userCredential.user.uid)
          setred(`${userCredential._tokenResponse.email} Logged In`);
          console.log("User log in");
        })
        .catch((error) => {
          console.log(error);
        });
      seterrors(false);
  };
  console.log(red);
  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${sideimage})` }}>
        <div className="container">
          <form action="/action_page.php">
            <div className="row">
              <h2>Login User</h2>
              <div className="col">
                <input
                  type="email"
                  name="Email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>
              <h2 style={{ color: "red" }}>{error}</h2>
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col">
            <button onClick={login} className="btn">
              Sign In
            </button>
          </div>
          <h2 style={{ color: "green" }}>{red}</h2>
        </div>
      </div>
    </>
  );
}
