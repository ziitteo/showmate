import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import usePerformanceQuery from '../../hooks/usePerformances';
import BannerCarousel from '../../common/components/BannerCarousel/BannerCarousel';
import GenreRanking from './components/GenreRanking/GenreRanking';
import { PacmanLoader } from 'react-spinners';

const Homepage = () => {
  const { data, isLoading, isError, error } = usePerformanceQuery();

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <PacmanLoader color="#E4CCFD" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <Container>
      <BannerCarousel data={data} />
      <GenreRanking />
    </Container>
  );
};

export default Homepage;
