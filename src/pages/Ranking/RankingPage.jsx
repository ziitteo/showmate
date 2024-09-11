import React, { useEffect, useState } from 'react';
import { fetchBoxOffice } from './fetchBoxOffice';
import GenreRankingTab from './GenreRankingTab';
import RankingList from './RankingList';
import './RankingPage.style.css';

const getGenreCode = (genre) => {
  switch (genre) {
    case '연극':
      return 'AAAA';
    case '뮤지컬':
      return 'GGGA';
    case '콘서트':
      return 'CCCD';
    case '무용':
      return 'BBBC';
    case '대중무용':
      return 'BBBE';
    case '서양음악':
      return 'CCCA';
    case '한국음악':
      return 'CCCC';
    case '서커스/마술':
      return 'EEEB';
    default:
      return 'AAAA';
  }
};

const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const RankingPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('연극');
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRankingsData = async () => {
      try {
        setLoading(true);
        const genreCode = getGenreCode(selectedGenre);
        const date = selectedPeriod === 'day' ? getYesterdayDate() : getCurrentDate();
        const data = await fetchBoxOffice(selectedPeriod, date, genreCode);

        if (data && data.boxofs && Array.isArray(data.boxofs.boxof)) {
          setRankings(data.boxofs.boxof);
        } else {
          setRankings([]);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
        setRankings([]);
      } finally {
        setLoading(false);
      }
    };

    loadRankingsData();
  }, [selectedGenre, selectedPeriod]);

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSelectedPeriod('day');
  };

  return (
    <div className="ranking-page">
      <h1>장르별 랭킹</h1>
      <GenreRankingTab selectedGenre={selectedGenre} setSelectedGenre={handleGenreClick} />
      <div className="period-selector">
        <button
          onClick={() => handlePeriodClick('day')}
          className={`${selectedPeriod === 'day' ? 'active' : ''}`}
        >
          일간
        </button>
        <span>|</span>
        <button
          onClick={() => handlePeriodClick('week')}
          className={selectedPeriod === 'week' ? 'active' : ''}
        >
          주간
        </button>
        <span>|</span>
        <button
          onClick={() => handlePeriodClick('month')}
          className={selectedPeriod === 'month' ? 'active' : ''}
        >
          월간
        </button>
      </div>
      {loading ? <div>로딩 중...</div> : <RankingList rankings={rankings} />}
    </div>
  );
};

export default RankingPage;
