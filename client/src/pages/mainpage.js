import "../styles/mainpage.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div class="mainpage-parent">
      <div id="label">Experiments</div>
      <Link to="/login" id="mainpage-link">Login</Link>
      <Link to="/register" id="mainpage-link">Register</Link>
    </div>
  );
};

export default Main;
