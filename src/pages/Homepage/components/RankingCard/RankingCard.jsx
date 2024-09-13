import React from 'react';
import './RankingCard.style.css';
import { useNavigate } from 'react-router-dom';

const RankingCard = ({ item }) => {
  const navigate = useNavigate();

  const showDetail = item => {
    navigate(`/goods/${item.mt20id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      key={item.mt20id}
      role='button'
      tabIndex='0'
      className='ranking-card-container'
      onClick={() => showDetail(item)}
    >
      <div className='image-wrap'>
        <div className='image-container'>
          {item.poster ? (
            <img src={`https://www.kopis.or.kr/${item.poster}`} alt={item.prfnm} className='card-image' />
          ) : (
            <p></p>
          )}
        </div>
        <div className='ranking-info'>
          <h1 className='rank'>{item.rnum}</h1>
        </div>
      </div>

      <div className='card-info'>
        <h2>{item.prfnm}</h2>
        <p>{item.prfplcnm}</p>
        <p className='date-info'>{item.prfpd}</p>
      </div>
    </div>
  );
};

export default RankingCard;
