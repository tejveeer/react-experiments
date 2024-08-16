import { Link } from 'react-router-dom';
import './mainpage.css';

const Main = () => {
  return (
    <div class='min-h-full flex flex-col items-center justify-center'>
      <div id='label' className='text-xl mb-4'>Experiments</div>
      <Link
        to='/login'
        id='mainpage-link'
      >
        Login
      </Link>
      <Link
        to='/register'
        id='mainpage-link'
      >
        Register
      </Link>
    </div>
  );
};

export default Main;
