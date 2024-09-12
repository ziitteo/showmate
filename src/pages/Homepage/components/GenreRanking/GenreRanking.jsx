import React, { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useRankingQuery from '../../../../hooks/useRanking';
import RankingCarousel from '../RankingCarousel/RankingCarousel';
import './GenreRanking.style.css';

const GenreRanking = () => {
  const menuList = [
    { label: '연극', categoryCode: 'AAAA' },
    { label: '뮤지컬', categoryCode: 'GGGA' },
    { label: '대중음악', categoryCode: 'CCCD' },
    { label: '서양/한국무용', categoryCode: 'BBBC' },
    { label: '대중무용', categoryCode: 'BBBE' },
    { label: '클래식', categoryCode: 'CCCA' },
    { label: '국악', categoryCode: 'CCCC' },
    { label: '서커스/마술', categoryCode: 'EEEB' },
    { label: '복합예술공연', categoryCode: 'EEEA' },
  ];

  const [activeMenu, setActiveMenu] = useState(menuList[0].label);
  const currentCategory = menuList.find(menu => menu.label === activeMenu).categoryCode;

  // 선택된 장르의 데이터를 가져오는 API 요청
  const { data, isLoading, isError, error } = useRankingQuery('month', currentCategory);

  const navigate = useNavigate();

  const ShowMoreRanking = () => {
    navigate('/ranking');
  };

  const handleMenuSelect = event => {
    setActiveMenu(event.target.textContent);
  };

  if (isLoading) {
    return (
      <div className='ranking-spinner-container'>
        <Spinner animation='border' variant='warning' />
      </div>
    );
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
            <li key={menu.label}>
              <button type='button' onClick={handleMenuSelect} className={activeMenu === menu.label ? 'on' : ''}>
                {menu.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <RankingCarousel data={data.boxofs.boxof} activeMenu={activeMenu} />
        <div className='button-wrap'>
          <button type='button' className='more-button' onClick={ShowMoreRanking}>
            랭킹 전체보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenreRanking;
