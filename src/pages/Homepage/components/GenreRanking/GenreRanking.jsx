import React, { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useMusicalRankingQuery from '../../../../hooks/useMusicalRanking';
import useConcertRankingQuery from '../../../../hooks/useConcertRanking';
import usePlayRankingQuery from '../../../../hooks/usePlayRanking';
import RankingCarousel from '../RankingCarousel/RankingCarousel';
import './GenreRanking.style.css';

const GenreRanking = () => {
  const menuList = ['뮤지컬', '콘서트', '연극'];

  const [activeMenu, setActiveMenu] = useState('뮤지컬');

  const { data, isLoading, isError, error } = useMusicalRankingQuery();
  const { data: concertData } = useConcertRankingQuery();
  const { data: theaterData } = usePlayRankingQuery();

  const navigate = useNavigate();

  const ShowMoreMusicalRanking = () => {
    navigate('/ranking');
  };

  const ShowMoreConcertRanking = () => {
    navigate('/ranking');
  };

  const ShowMorePlayRanking = () => {
    navigate('/ranking');
  };

  console.log(data);

  const handleMenuSelect = event => {
    setActiveMenu(event.target.textContent);
  };

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div>
      <div className='ranking-container'>
        <h1>장르별 랭킹</h1>
        <ul>
          {menuList.map(menu => (
            <li key={menu}>
              <button type='button' onClick={handleMenuSelect} className={activeMenu === menu ? 'on' : ''}>
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeMenu === '뮤지컬' && (
        <div>
          <RankingCarousel data={data.boxofs.boxof} activeMenu={activeMenu} />
          <div className='button-wrap'>
            <button type='button' className='more-button' onClick={ShowMoreMusicalRanking}>
              뮤지컬 랭킹 전체보기
            </button>
          </div>
        </div>
      )}

      {activeMenu === '콘서트' && (
        <div>
          <RankingCarousel data={concertData.boxofs.boxof} activeMenu={activeMenu} />
          <div className='button-wrap'>
            <button type='button' className='more-button' onClick={ShowMoreConcertRanking}>
              콘서트 랭킹 전체보기
            </button>
          </div>
        </div>
      )}

      {activeMenu === '연극' && (
        <div>
          <RankingCarousel data={theaterData.boxofs.boxof} activeMenu={activeMenu} />
          <div className='button-wrap'>
            <button type='button' className='more-button' onClick={ShowMorePlayRanking}>
              연극 랭킹 전체보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreRanking;
