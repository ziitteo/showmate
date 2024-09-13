import React, { useState } from 'react';
import './RegionCard.style.css'; 
import useRegionQuery from '../../hooks/useRegionQuery';
import { Spinner } from 'react-bootstrap';

const RegionCard = () => {
  const [sortBy, setSortBy] = useState('rank'); // Default sorting by rank
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

  const limitedData = data.slice(0, 100);

  // Sorting functions
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

  return (
    <div>
      <div className="region-card-container">
        <div className="sort-buttons">
          <button 
              className={sortBy === 'rank' ? 'selected' : ''} 
              onClick={() => setSortBy('rank')}
          >
              인기순
          </button>
          <button 
              className={sortBy === 'start' ? 'selected' : ''} 
              onClick={() => setSortBy('start')}
          >
              최신순
          </button>
          <button 
              className={sortBy === 'end' ? 'selected' : ''} 
              onClick={() => setSortBy('end')}
          >
              임박순
          </button>
        </div>
        {sortedData.map(performance => (
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
