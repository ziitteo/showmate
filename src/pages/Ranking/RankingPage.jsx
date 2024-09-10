// RankingPage.jsx
import React, { useEffect, useState } from 'react';
import fetchBoxOffice from '../../hooks/useGenreRanking';
import GenreRankingTab from './GenreRankingTab';
import RankingList from './RankingList';
import './RankingPage.style.css';

const getGenreCode = genre => { // 괄호 제거
  switch (genre) {
    case '연극':
      return 'AAAA';
    case '뮤지컬':
      return 'GGGA';
    case '대중음악':
      return 'CCCD';
    case '무용(서양/한국무용)':
      return 'BBBC';
    case '대중무용':
      return 'BBBE';
    case '서양음악(클래식)':
      return 'CCCA';
    case '한국음악(국악)':
      return 'CCCC';
    case '복합':
      return 'EEEA';
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
  const [selectedGenre, setSelectedGenre] = useState('뮤지컬');
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

        if (selectedPeriod === 'day' && data?.boxofs === '') {
          setRankings([]);
        } else if (data && data.boxofs && Array.isArray(data.boxofs.boxof) && data.boxofs.boxof.length > 0) {
          setRankings(data.boxofs.boxof);
        } else {
          setRankings([]);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRankingsData();
  }, [selectedGenre, selectedPeriod]);

  return (
    <div className="ranking-page">
      <h1>장르별 랭킹</h1>
      <GenreRankingTab selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      <div className="period-selector">
        <button
          onClick={() => setSelectedPeriod('day')}
          className={`${selectedPeriod === 'day' ? 'active' : ''}`}
        >
          일간
        </button>
        <span>|</span>
        <button onClick={() => setSelectedPeriod('week')} className={selectedPeriod === 'week' ? 'active' : ''}>주간</button>
        <span>|</span>
        <button onClick={() => setSelectedPeriod('month')} className={selectedPeriod === 'month' ? 'active' : ''}>월간</button>
      </div>
      {loading ? <div>로딩 중...</div> : <RankingList rankings={rankings} />}
    </div>
  );
};

export default RankingPage;
