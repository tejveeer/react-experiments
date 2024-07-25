import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/mainpage';
import TicTacToe from './pages/tictactoe';
import Experiment from './pages/experiment';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Cookies from 'js-cookie';
import Homepage from './pages/homepage';
import Calculator from './pages/calculator';
import TodoApp from './pages/todolist';

const App = () => {
  const [user, setUser] = useState(() => {
    const data = Cookies.get('user');
    if (data) {
      return JSON.parse(data);
    }
    return { name: '', email: '', userId: '' };
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
        {/* Protected routes */}
        <Route
          path='/homepage'
          element={!user.name ? <Navigate to='/login' /> : <Homepage />}
        ></Route>
        <Route
          path='/tictactoe'
          element={!user.name ? <Navigate to='/login' /> : <TicTacToe />}
        ></Route>
        <Route
          path='/experiment'
          element={!user.name ? <Navigate to='/login' /> : <Experiment />}
        ></Route>
        <Route
          path='/calculator'
          element={!user.name ? <Navigate to='/login' /> : <Calculator />}
        ></Route>
        <Route
          path='/todolist'
          element={!user.name ? <Navigate to='/todolist' /> : <TodoApp />}
        ></Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
