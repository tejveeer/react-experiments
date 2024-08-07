import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import { Link } from 'react-router-dom';

import './homepage.css';
import {
  getCategoriesInformation,
  useCategoriesInformation,
} from '../utils/categoriesUtils';

const Category = ({ categoryName, category }) => {
  const creationDate = new Date(category.meta?.date).toLocaleDateString();
  console.log(category);
  return (
    <>
      <div className=''>
        <div className='flex justify-between'>
          <h4 className='mt-0'>{categoryName}</h4>
          <span className='text-sm italic'>{creationDate}</span>
        </div>
      </div>
    </>
  );
};

const Homepage = () => {
  const catInfo = useCategoriesInformation();
  const { user } = useContext(UserContext);

  return (
    <div className='mx-auto w-2/3'>
      <p>Hey {user.name}, the following projects are available for your use:</p>
      <div
        id='categories'
        className=''
      >
        {Object.keys(catInfo).map((key) => (
          <Category
            categoryName={key}
            category={catInfo[key]}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
