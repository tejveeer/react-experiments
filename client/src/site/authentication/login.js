import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../utils/UserContext';

import './auth.css';

const Login = () => {
  console.log('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('');
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    setStatus('');
    event.preventDefault();
    const res = await fetch(`http://localhost:2500/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status === 200) {
      const { name, email } = await res.json();
      setUser({
        name,
        email,
      });
      setStatus('Successful!');
      navigate('/homepage');
    } else if (res.status === 400) {
      navigate('/register');
    }
  };

  return (
    <div className='parent'>
      <div id='auth-type'>Login</div>
      <form onSubmit={onSubmit}>
        <label for='email'>Email</label>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email...'
        ></input>
        <label for='password'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your password...'
        ></input>
        <button>Submit</button>
      </form>
      <div id='status'>{status}</div>
    </div>
  );
};

export default Login;
