import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./routes/login";
import Register from "./routes/register";
import Main from "./routes/mainpage";
import TicTacToe from "./routes/tictactoe";
import Experiment from "./routes/experiment";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Cookies from "js-cookie";
import Homepage from "./routes/homepage";
import Calculator from "./routes/calculator";

const App = () => {
  const [user, setUser] = useState(() => {
    const data = Cookies.get("user");
    if (data) {
      return JSON.parse(data);
    }
    return { name: "", email: "", userId: "" };
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={!user.name ? <Login /> : <Navigate to="/homepage" />}></Route>
        <Route path="/register" element={!user.name ? <Register /> : <Navigate to="/homepage" />}></Route>
        {/* Protected routes */}
        <Route
          path="/homepage"
          element={!user.name ? <Navigate to="/login" /> : <Homepage />}
        ></Route>
        <Route
          path="/tictactoe"
          element={!user.name ? <Navigate to="/login" /> : <TicTacToe />}
        ></Route>
        <Route
          path="/experiment"
          element={!user.name ? <Navigate to="/login" /> : <Experiment />}
        ></Route>
        <Route
          path="/calculator"
          element={!user.name ? <Navigate to="/login" /> : <Calculator />}
        ></Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
