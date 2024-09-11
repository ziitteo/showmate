import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import useGenreQuery from '../../hooks/useGenre';
import BannerCarousel from '../../common/components/BannerCarousel/BannerCarousel';
import ItemCarousel from '../../common/components/ItemCarousel/ItemCarousel';
import AllItem from '../../common/components/AllItem/AllItem';

const MusicalPage = () => {
  // 뮤지컬 전체 데이터 요청
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useGenreQuery('GGGA');
  // 공연 예정인 뮤지컬 데이터 요청
  const { data: expectedData } = useGenreQuery('GGGA', { prfstate: '01' }); // 공연 예정
  // 공연 중인 뮤지컬 데이터 요청
  const { data: playingData } = useGenreQuery('GGGA', { prfstate: '02' }); // 공연 중

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
      <h1 className='item-title'>뮤지컬 둘러보기</h1>
      <AllItem data={data} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
    </div>
  );
};

export default MusicalPage;
