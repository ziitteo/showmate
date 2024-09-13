import React, { useEffect } from 'react';
import { useGlobal } from './GlobalContext';
import axios from "../../utils/axios";
import { parseXML } from "../../utils/util";
import { Container } from 'react-bootstrap';

const DetailPage = () => {
  const context = useGlobal();

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(`/pblprfr/PF132236`); // API 호출 예시
        const result = parseXML(request.data); // XML 변환
        const data = result.dbs.db;
        console.log('최종 data', data);
        if (context) {
          context.updateData(data); // 데이터를 Context에 저장
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    }

    fetchData();
  }, [context]); // context가 변경될 때만 useEffect 실행

  // context가 없으면 에러 처리
  if (!context) {
    return <div>Context is not available</div>;
  }

  const { data } = context;

  if (!data) return <h2>Loading...</h2>;

  return (
    <Container>
      <h2>{data.prfnm}</h2>
      <div>
        <img src={data.poster} alt={data.prfnm}/>
      </div>
      <div className='detail-right-item'>
        <strong>장소</strong>
        <p>{data?.fcltynm}</p>
      </div>
      <div className='detail-right-item'>
        <strong>공연기간</strong>
        <p>{data?.prfpdfrom}~{data?.prfpdto}</p>
      </div>
      <div className='detail-right-item'>
        <strong>공연시간</strong>
        <p>{data?.prfruntime}</p>
      </div>
      <div className='detail-right-item'>
        <strong>관람연령</strong>
        <p>{data?.prfage}</p>
      </div>
      <div className='detail-right-item'>
        <strong>티켓가격</strong>
        <p>{data?.pcseguidance}</p>
      </div>
      <div className='detail-right-item'>
        <strong>출연진</strong>
        <p>{data?.prfcast}</p>
      </div>
      <div className='detail-right-item'>
        <strong>{data?.prfcrew ? '제작진' : '제작사'}</strong>
      </div> 
    </Container>
  );
};

export default DetailPage;
