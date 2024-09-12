import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailInfoQeury } from '../../hooks/useDetailInfo';
import './DetailPage.style.css';
import { Container } from 'react-bootstrap';

const DetailPage = () => {
  const {id} = useParams();
  const {data, isLoading, isError, error} = useDetailInfoQeury(id);

  console.log('id',id)
  console.log('detail data',data)
  return (
    <Container>
      <h2>{data.prfnm}</h2>
      <div>
        {/* <img src={data.poster} alt={data.prfnm}/> */}
      </div>
        <div className='detail-right-item'>
          <strong>장소</strong>
          <p>{data.fcltynm}</p>
        </div>
        <div className='detail-right-item'>
          <strong>공연기간</strong>
          <p>{data.prfpdfrom}~{data.prfpdto}</p>
        </div>
        <div className='detail-right-item'>
          <strong>공연시간</strong>
          <p>{data.prfruntime}</p>
        </div>
        <div className='detail-right-item'>
          <strong>관람연령</strong>
          <p>{data.prfage}</p>
        </div>
        <div className='detail-right-item'>
          <strong>티켓가격</strong>
          <p>{data.pcseguidance}</p>
        </div>
        <div className='detail-right-item'>
          <strong>출연진</strong>
          <p>{data.prfcast}</p>
        </div>
        <div className='detail-right-item'>
          <strong>{data.prfcrew?'제작진':'제작사'}</strong>
          <p>{data.prfcrew?data.prfcrew:data.entrpsnmP}</p>
        </div>
      <div>

      </div>
    </Container>
  )  
};

export default DetailPage;