import axios from 'axios';

// 환경 변수에서 API 키 가져오기
const API_KEY = process.env.REACT_APP_API_KEY;

// axios 인스턴스 생성
const instance = axios.create({
  // 배포,로컬 환경별로 프록시 경로 설정
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api'                   // production(배포 환경)에서는 '/api'로 설정
    : '/api/openApi/restful',  // development(로컬 환경)에서는 '/api/openApi/restful'로 설정
  headers: {
    Accept: 'application/xml', // XML 응답 수락
  },
  params: {
    service: API_KEY
  }
});

export default instance;