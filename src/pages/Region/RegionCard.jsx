import React, { useState } from 'react';
import './RegionCard.style.css'; 
import useRegionQuery from '../../hooks/useRegionQuery';
import { Spinner } from 'react-bootstrap';

const RegionCard = () => {
  const [sortBy, setSortBy] = useState('rank'); // Default sorting by rank
  const [selectedRegion, setSelectedRegion] = useState('all'); // Region filter state
  const { data, isLoading, isError } = useRegionQuery();

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='warning' />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // 데이터 가져오는 갯수 시작
  const limitedData = data.slice(0, 100);
  // 데이터 가져오는 갯수 끝

  // 최신순, 임박순, 인기순 필터 시작
  const sortData = (data, sortBy) => {
    switch (sortBy) {
      case 'rank':
        return data.sort((a, b) => a.rank - b.rank);
      case 'start':
        return data.sort((a, b) => new Date(b.start) - new Date(a.start));
      case 'end':
        return data.sort((a, b) => new Date(a.end) - new Date(b.end));
      default:
        return data;
    }
  };

  const sortedData = sortData(limitedData, sortBy);

  // 최신순, 임박순 인기순 필터 끝

  // 지역 필터 시작
  const regionKeywords = {
    all: [],
    seoul: ['마포', '잠실', '노들', '서울', '대학로', '반포', '블루','일신', '아르코', '구름', '에어'],
    gg: ['평택', '부천', '안양', '여주', '고양', '인천', '안성','성남', '수원'], 
    gs: ['부산', '김해', '대구', '울산', '밀양', ],
    gw: ['동해', '천안', '강릉', '청주', '대전', ],
    jj: ['전주', '여수', '광주']
  };

  const filterByRegion = (data, region) => {
    if (region === 'all') return data;
    const keywords = regionKeywords[region] || [];
    return data.filter(item => keywords.some(keyword => item.title.includes(keyword)));
  };

  const filteredData = filterByRegion(sortedData, selectedRegion);
  // 지역 필터 끝

  return (
    <div>
                      <div className="filter-buttons">
          <button className={selectedRegion === 'all' ? 'selected' : ''} onClick={() => setSelectedRegion('all')}>
            전체
          </button>
          <button className={selectedRegion === 'seoul' ? 'selected' : ''} onClick={() => setSelectedRegion('seoul')}>
            서울
          </button>
          <button className={selectedRegion === 'gg' ? 'selected' : ''} onClick={() => setSelectedRegion('gg')}>
            경기
          </button>
          <button className={selectedRegion === 'gw' ? 'selected' : ''} onClick={() => setSelectedRegion('gw')}>
            충청/강원
          </button>
          <button className={selectedRegion === 'gs' ? 'selected' : ''} onClick={() => setSelectedRegion('gs')}>
            경북/경남
          </button>
          <button className={selectedRegion === 'jj' ? 'selected' : ''} onClick={() => setSelectedRegion('jj')}>
            전북/전남
          </button>
        </div>
      <div className="region-card-container">
        <div className="sort-buttons">
          <button className={sortBy === 'rank' ? 'selected' : ''} onClick={() => setSortBy('rank')}>
            인기순
          </button>
          <button className={sortBy === 'start' ? 'selected' : ''} onClick={() => setSortBy('start')}>
            최신순
          </button>
          <button className={sortBy === 'end' ? 'selected' : ''} onClick={() => setSortBy('end')}>
            임박순
          </button>
        </div>

        {filteredData.map(performance => (
          <div key={performance.id} className="region-card">
            <div className='region-image-container'>
              <img src={performance.poster} alt={`${performance.title} 포스터`} className='region-card-image' />
            </div>
            <div className="region-card-info">
              <h2>{performance.title}</h2>
              <p className='region-date-info'>{performance.start} ~ {performance.end}</p>
              <p>{performance.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionCard;
