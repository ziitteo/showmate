import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import usePerformanceQuery from '../../hooks/usePerformances';
import BannerCarousel from '../../common/components/BannerCarousel/BannerCarousel';
import GenreRanking from './components/GenreRanking/GenreRanking';

const Homepage = () => {
  const { data, isLoading, isError, error } = usePerformanceQuery();

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div className='section'>
      <BannerCarousel data={data} />
      <GenreRanking />
    </div>
  );
};

export default Homepage;
