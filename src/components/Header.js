import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/header.module.css";
import logo from "../assets/logo";
import DropdownMenu from "./DropdownMenu";

const Header = (props) => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
const logout=()=>{
  localStorage.clear();
}
 

  return (
    <div className={styles.header + " container-center"}>
      <div className={styles.logo}>
        <img src={logo} alt=""></img>
        <h1>One World Academy</h1>
      </div>

      <div className={styles.links + " container-center"}>
        <NavLink className={styles.link} to="/">
          Home
        </NavLink>
        <DropdownMenu title="Courses">
          <div onClick={() => navigate("/free-courses")}>Free Courses</div>
          <div onClick={() => navigate("/paid-courses")}>Paid Courses</div>
        </DropdownMenu>
        <NavLink className={styles.link} to="/teachers">
          Teachers
        </NavLink>
        <NavLink className={styles.link} to="/">
          Blogs
        </NavLink>
        {  email?  <div></div>:  <NavLink className={styles.link} to="/register">
          Register
        </NavLink>}
    {  email?  <NavLink onClick={logout} className={styles.link} to="/">
          Logout
        </NavLink>:
        <NavLink className={styles.link} to="/login">
          Login
        </NavLink>}
      </div>
      <h1>{email}</h1>
    </div>
  );
};

export default Header;
