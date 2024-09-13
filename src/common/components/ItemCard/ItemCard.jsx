import React from 'react';
import './ItemCard.style.css';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {

  const navigate = useNavigate();

  const showDetail = item => {
    navigate(`/goods/${item.mt20id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div key={item.mt20id} role='button' tabIndex='0' className='card-container' onClick={() => showDetail(item)}>
      <div className='image-container'>
        <img src={item.poster} alt={item.prfnm} className='card-image' />
      </div>
      <div className='card-info'>
        <h2>{item.prfnm}</h2>
        <p>{item.fcltynm}</p>
        <p className='date-info'>
          {item.prfpdfrom === item.prfpdto ? item.prfpdfrom : `${item.prfpdfrom} - ${item.prfpdto} `}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
