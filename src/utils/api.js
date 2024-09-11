import axios from 'axios';
import { parseXML } from './util'; // XML to JSON 변환 함수

// 환경 변수에서 API 키 가져오기
const API_KEY = process.env.REACT_APP_API_KEY;

// axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api/openApi/restful', // 프록시 경로를 통해 API 요청
  headers: {
    Accept: 'application/xml', // XML 응답 수락
  },
});

// 공연 정보를 가져오는 API 요청 함수
const fetchData = async (endpoint, params = {}) => {
  try {
    // API 요청
    const response = await api.get(endpoint, {
      params: {
        service: API_KEY, // API_KEY를 쿼리 파라미터로 추가
        ...params, // 추가적인 파라미터가 있을 경우 병합
      },
    });

    // XML 데이터를 JSON으로 변환
    const jsonData = parseXML(response.data);
    // 변환된 JSON 데이터 반환
    return jsonData;
  } catch (error) {
    // 오류 처리 또는 다시 던지기
    throw new Error(`API 요청 중 오류 발생: ${error.message}`);
  }
};

export default fetchData;
