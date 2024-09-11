import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div className='card-container'>
      <img src={item.poster} alt={item.prfnm} className='card-image' />
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
