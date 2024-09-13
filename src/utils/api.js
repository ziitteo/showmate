import axios from 'axios';
import { parseXML } from './util'; // XML to JSON 변환 함수

// 환경 변수에서 API 키 가져오기
// 이 API 키는 외부 API(Kopis API 등)에 요청할 때 필요
// 보안상 중요한 정보이므로 환경 변수로 관리
const API_KEY = process.env.REACT_APP_API_KEY;

// axios 인스턴스 생성
// axios는 HTTP 요청을 처리하는 라이브러리로, 기본 설정값(baseURL 등)을 미리 설정한 인스턴스를 생성하여 재사용 가능
const api = axios.create({
  // baseURL: API 요청을 보낼 기본 URL
  // Netlify Functions를 사용하여 외부 API로 요청을 보내기 위해 '/.netlify/functions/api-proxy'로 설정
  // 로컬 환경에서는 '/api/openApi/restful'로 설정
  baseURL: '/api/openApi/restful', // 로컬 개발 환경에서는 직접 Kopis API 서버로 요청 (setupProxy.js 파일을 통해 프록시 설정됨)
  // 서버에서 XML 형식의 응답을 JSON으로 변환하기 위해 Accept 헤더 설정
  headers: {
    Accept: 'application/xml', // 응답을 XML 형식으로 수락 (API가 XML 형식으로 데이터를 반환하므로 이를 명시)
  },
});

// 공연 정보를 가져오는 API 요청 함수
const fetchData = async (endpoint, params = {}) => {
  try {
    // API 요청
    // axios.get() 메서드를 사용하여 GET 요청을 보냄
    // 요청 URL: baseURL + endpoint
    // 쿼리 파라미터: service(API_KEY) + 추가 파라미터
    const response = await api.get(endpoint, {
      params: {
        service: API_KEY, // API_KEY를 쿼리 파라미터로 추가
        ...params, // 추가적인 파라미터가 있을 경우 병합
      },
    });

    // API 응답 데이터를 XML 형식에서 JSON 형식으로 변환
    // parseXML 함수는 XML 형식의 응답을 읽고, 이를 JavaScript 객체로 변환해 사용하기 쉽게 만듦
    const jsonData = parseXML(response.data);
    // 변환된 JSON 데이터 반환
    return jsonData; // 이 데이터는 호출된 곳에서 사용할 수 있도록 반환됨
  } catch (error) {
    // API 요청 중 오류가 발생한 경우, 해당 오류 메시지를 포함한 Error 객체를 던짐
    // catch 블록은 네트워크 오류, API 오류 등을 처리하며, 이를 호출한 쪽에서 처리할 수 있도록 오류 메시지를 반환
    throw new Error(`API 요청 중 오류 발생: ${error.message}`);
  }
};

export default fetchData;