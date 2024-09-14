import React, { useEffect } from 'react';
import { useGlobal } from './GlobalContext';
import axios from "../../utils/axios";
import { parseXML } from "../../utils/util";
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import './DetailPage.style.css';

const DetailPage = () => {
  const infoData = useGlobal();
  const {id} = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(`/pblprfr/${id}`); // API 호출 예시
        console.log('호출 api URL',request.request.responseURL);
        const result = parseXML(request.data); // XML 변환
        const data = result.dbs.db;
        console.log('최종 data', data);
        if (infoData) {
          infoData.updateData(data); // 데이터를 Context에 저장
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    }

    fetchData();
  }, [id]); // id가 변경될 때만 useEffect 실행

  // infoData가 없으면 에러 처리
  if (!infoData) {
    return <div>Detail Data is not available</div>;
  }

  const { data } = infoData;

  if (!data) return (
    <div className='spinner-container'>
      <PacmanLoader color="#E4CCFD" />
    </div>
  );

  return (
    <div className='detail-all'>
      <h2>{data.prfnm}</h2>
      <div className='d-flex'>
        <img className='detail-poster' src={data.poster} alt={data.prfnm}/>
        <div className='detail-right'>
          <div className='detail-right-item'>
            <strong>장소</strong>
            <p>{data?.fcltynm}</p>
          </div>
          <div className='detail-right-item'>
            <strong>공연기간</strong>
            <p>{data?.prfpdfrom} ~ {data?.prfpdto}</p>
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
          <div className={`detail-right-item ${data?.prfcast ? '' : 'item-hidden'}`}>
            <strong>출연진</strong>
            <p>{data?.prfcast}</p>
          </div> 
          <div className={`detail-right-item ${data?.prfcrew ? '' : 'item-hidden'}`}>
            <strong>제작진</strong>
            <p>{data?.prfcrew}</p>
          </div> 
          <div className={`detail-right-item ${data?.entrpsnmP ? '' : 'item-hidden'}`}>
            <strong>제작사</strong>
            <p>{data?.entrpsnmP}</p>
          </div> 
          <div className={`detail-right-item ${data?.entrpsnmA ? '' : 'item-hidden'}`}>
            <strong>기획사</strong>
            <p>{data?.entrpsnmA}</p>
          </div> 
          <div className={`detail-right-item ${data?.entrpsnmH ? '' : 'item-hidden'}`}>
            <strong>주최</strong>
            <p>{data?.entrpsnmH}</p>
          </div> 
          <div className={`detail-right-item ${data?.entrpsnmS ? '' : 'item-hidden'}`}>
            <strong>주관</strong>
            <p>{data?.entrpsnmS}</p>
          </div>
          <div className='detail-buttons'>
            <button>예매하기</button>  
          </div> 
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
