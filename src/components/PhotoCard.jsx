/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';


const PhotoCard = ({ photoUrl, title, name }) => {
  
  
  return (
    <div className='bg-white/10 p-5 rounded-xl overflow-hidden shadow-lg hover:shadow-lg hover:shadow-slate-50'>
      <Link to={`/photo/${name}`} className="max-w-sm m-4">
        <div className='bg-white/20 rounded-xl'>
          <img src={photoUrl} alt={title} className="w-60 h-48 object-cover rounded-xl" />
        </div>        
        <div className="px-6 pt-4">
          <h1 className="font-bold text-xl">{title}</h1>
        </div>
      </Link>
    </div>
  );
};

export default PhotoCard;
