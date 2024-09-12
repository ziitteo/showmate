import React from 'react';
import './BannerItem.style.css';
import { useNavigate } from 'react-router-dom';

const BannerItem = ({ item }) => {
  const navigate = useNavigate();

  const showDetail = item => {
    navigate(`/goods/${item.mt20id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div key={item.mt20id} role='button' tabIndex='0' className='banner-item' onClick={() => showDetail(item)}>
      <div className='image-container'>
        <img src={item.poster} alt={item.prfnm} className='banner-image' />
      </div>
      <div className='banner-info'>
        <h2 className='banner-title'>{item.prfnm}</h2>
        <p className='banner-location'>{item.fcltynm}</p>
        <p className='banner-date'>
          {item.prfpdfrom === item.prfpdto ? item.prfpdfrom : `${item.prfpdfrom} - ${item.prfpdto} `}
        </p>
      </div>
    </div>
  );
};

export default BannerItem;
