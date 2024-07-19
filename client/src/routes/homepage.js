import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import "../styles/homepage.css";

const Homepage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="homepage-body">
      <div className="greeting">Hello {user.name}!</div>
      <p>Hey {user.name}, the following projects are available for your use:</p>
      <div className="available-projects">
        <ul>
          <li>
            <Link to="/tictactoe">/tictactoe</Link>
          </li>
          <li>
            <Link to="/experiment">/experiment</Link>
          </li>
          <li>
            <Link to="/calculator">/calculator</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Homepage;
