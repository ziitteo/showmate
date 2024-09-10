import axios from 'axios';
import { parseXML, getStartDate, getEndDate } from './util';

// 환경 변수에서 API 키 가져오기
const API_KEY = process.env.REACT_APP_API_KEY;

// axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api/openApi/restful/pblprfr', // 프록시 경로를 통해 API 요청
  headers: {
    Accept: 'application/xml', // XML 응답 수락
  },
});

// 공연 정보를 가져오는 API 요청 함수
const fetchPerformances = async (params = {}) => {
  const stdate = getStartDate(); // 오늘 기준 3개월 전
  const eddate = getEndDate(); // 오늘 기준 1년 뒤

  try {
    // API 요청
    const response = await api.get('', {
      params: {
        ...params,
        service: API_KEY, // API_KEY를 쿼리 파라미터로 추가
        stdate,
        eddate,
        rows: 10, // 한번에 가져올 데이터 개수
        cpage: 1, // 페이지 번호
      },
    });

    // XML 데이터를 JSON으로 변환
    const jsonData = parseXML(response.data);

    // 변환된 JSON 데이터 반환
    return jsonData;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
};

// 요청 인터셉터 추가하기
api.interceptors.request.use(
  config => {
    console.log('요청 인터셉터 - 요청 보내기 전:', config); // 요청 인터셉터 확인
    return config;
  },
  error => {
    console.error('요청 오류:', error); // 요청 오류 확인
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  response => {
    console.log('응답 인터셉터 - 응답 받음:', response); // 응답 인터셉터 확인
    return response;
  },
  error => {
    console.error('응답 오류:', error); // 응답 오류 확인
    return Promise.reject(error);
  },
);

export default fetchPerformances;
