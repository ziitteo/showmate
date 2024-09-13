// RankingPage.jsx
import React, { useState } from 'react';
import GenreRankingTab from './GenreRankingTab';
import RankingList from './RankingList';
import useRankingData from '../../hooks/useGenreRanking';
import './RankingPage.style.css';

const getGenreCode = (genre) => {
  switch (genre) {
    case '연극':
      return 'AAAA';
    case '뮤지컬':
      return 'GGGA';
    case '콘서트':
      return 'CCCD';
    case '서양/한국무용':
      return 'BBBC';
    case '대중무용':
      return 'BBBE';
    case '클래식':
      return 'CCCA';
    case '국악':
      return 'CCCC';
    case '서커스/마술':
      return 'EEEB';
    case '복합예술공연':
      return 'EEEA';
    default:
      return 'AAAA';
  }
};

const RankingPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('연극');
  const [selectedPeriod, setSelectedPeriod] = useState('day');

  // 장르 변경 시 '일간'으로 설정하는 함수
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setSelectedPeriod('day'); // 장르가 변경될 때마다 '일간'으로 설정
  };


  const genreCode = getGenreCode(selectedGenre);
  const { data: rankings = [], isLoading } = useRankingData(selectedPeriod, genreCode);

  return (
    <div className="ranking-page-container">
      <h1 className="ranking-page-title">장르별 랭킹</h1>
      <GenreRankingTab selectedGenre={selectedGenre} setSelectedGenre={handleGenreChange} />
      <div className="ranking-page-period-selector">
        <button
          onClick={() => setSelectedPeriod('day')}
          className={`ranking-page-period-button ${selectedPeriod === 'day' ? 'ranking-page-active' : ''}`}
        >
          일간
        </button>
        <span className="ranking-page-divider">|</span>
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`ranking-page-period-button ${selectedPeriod === 'week' ? 'ranking-page-active' : ''}`}
        >
          주간
        </button>
        <span className="ranking-page-divider">|</span>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`ranking-page-period-button ${selectedPeriod === 'month' ? 'ranking-page-active' : ''}`}
        >
          월간
        </button>
      </div>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : rankings.length ? (
        <RankingList rankings={rankings} />
      ) : (
        <div>표시할 랭킹 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default RankingPage;