import { useContext } from 'react';
import { UserContext } from './utils/UserContext';

export default function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div
        id='nav'
        className='px-1 border-t-0 border-x-0 border-solid border-[2px] bg-teal-500 border-teal-600 opacity-60'
      >
        <ul className='w-full list-none flex justify-between p-0'>
          <li>User ({user.name})</li>
          <li>Test</li>
        </ul>
      </div>
    </>
  );
}

<body>
  <div id="nav"></div>
  <div></div>
</body>