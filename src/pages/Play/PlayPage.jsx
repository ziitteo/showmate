import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import useGenreQuery from '../../hooks/useGenre';
import BannerCarousel from '../../common/components/BannerCarousel/BannerCarousel';
import ItemCarousel from '../../common/components/ItemCarousel/ItemCarousel';
import AllItem from '../../common/components/AllItem/AllItem';

const PlayPage = () => {
  // 연극 전체 데이터 요청
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useGenreQuery('AAAA');
  // 공연 예정인 연극 데이터 요청
  const { data: expectedData } = useGenreQuery('AAAA', { prfstate: '01' }); // 공연 예정
  // 공연 중인 연극 데이터 요청
  const { data: playingData } = useGenreQuery('AAAA', { prfstate: '02' }); // 공연 중

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div className='section'>
      <BannerCarousel data={playingData} />
      <h1 className='item-title'>공연 예정</h1>
      <ItemCarousel data={expectedData} />
      <h1 className='item-title'>연극 둘러보기</h1>
      <AllItem data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
    </div>
  );
};

export default PlayPage;
