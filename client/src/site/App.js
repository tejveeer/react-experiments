import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./utils/UserContext";

import Homepage from "./home/Homepage";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Main from "./authentication/Mainpage";
import Navbar from "./navbar/Navbar";

import { useImportablePaths } from "./utils/categoriesUtils";
import Cookies from "js-cookie";

export default function App() {
  const routes = useDynamicallyGeneratedRoutes();
  const [user, setUser] = useState(() => {
    const data = Cookies.get("user");
    if (data) {
      return JSON.parse(data);
    }
    return { name: "", email: "", userId: "", roles: [] };
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="relative flex h-full flex-col">
        <Navbar />
        <div className="z-0 flex-grow">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/homepage"
              element={!user.name ? <Navigate to="/login" /> : <Homepage />}
            ></Route>
            {/* Protected routes */}
            {routes}
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

function useDynamicallyGeneratedRoutes() {
  const [components, setComponents] = useState([<></>]);
  const { importablePaths, isLoading } = useImportablePaths();

  useEffect(() => {
    const createRoutesFromImportablePaths = async () => {
      if (isLoading) return;
      const routedComponents = [];

      let key = 0;
      for (const importablePath of importablePaths) {
        const Component = (await import(`../categories/${importablePath}`))
          .default;
        const routePath = importablePath.replace(".js", "");

        routedComponents.push(
          <Route
            key={key}
            path={routePath}
            element={
              <AuthorizedRoute>
                <Component />
              </AuthorizedRoute>
            }
          ></Route>,
        );
        key += 1;
      }

      setComponents(routedComponents);
    };
    createRoutesFromImportablePaths();
  }, [isLoading, importablePaths]);

  return components;
}

function AuthorizedRoute({ pathOnFailure = "/login", children }) {
  const { user } = useContext(UserContext);
  if (!user.name) {
    return <Navigate to={pathOnFailure} />;
  }
  return children;
}
