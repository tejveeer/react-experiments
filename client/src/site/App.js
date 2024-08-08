import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './utils/UserContext';

import Homepage from './home/homepage';
import Login from './authentication/login';
import Register from './authentication/register';
import Main from './authentication/mainpage';
import Navbar from './Navbar';

import { getImportablePaths } from './utils/categoriesUtils';
import Cookies from 'js-cookie';

const useDynamicallyGeneratedRoutes = () => {
  const [components, setComponents] = useState([<></>]);

  useEffect(() => {
    const createRoutesFromImportablePaths = async () => {
      const importablePaths = await getImportablePaths();
      const routedComponents = [];

      for (const importablePath of importablePaths) {
        const Component = (await import(`../categories/${importablePath}`))
          .default;
        const routePath = '/' + importablePath.split('/')[1].split('.')[0];

        console.log(routePath);
        routedComponents.push(
          <Route
            path={routePath}
            element={
              <AuthorizedRoute>
                <Component />
              </AuthorizedRoute>
            }
          ></Route>,
        );
      }

      setComponents(routedComponents);
    };
    createRoutesFromImportablePaths();
  }, []);

  return components;
};

const AuthorizedRoute = ({ pathOnFailure = '/login', children }) => {
  const { user } = useContext(UserContext);
  if (!user.name) {
    return <Navigate to={pathOnFailure} />;
  }
  return children;
};

const App = () => {
  const routes = useDynamicallyGeneratedRoutes();

  const [user, setUser] = useState(() => {
    const data = Cookies.get('user');
    if (data) {
      return JSON.parse(data);
    }
    return { name: '', email: '', userId: '', roles: [] };
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='h-full flex flex-col'>
        <Navbar />
        <div className='relative flex-grow'>
          <Routes>
            <Route
              path='/'
              element={<Main />}
            ></Route>
            <Route
              path='/login'
              element={!user.name ? <Login /> : <Navigate to='/homepage' />}
            ></Route>
            <Route
              path='/register'
              element={!user.name ? <Register /> : <Navigate to='/homepage' />}
            ></Route>
            <Route
              path='/homepage'
              element={!user.name ? <Navigate to='/login' /> : <Homepage />}
            ></Route>
            {/* Protected routes */}
            {routes}
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default App;
