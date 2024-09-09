import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: 'http://kopis.or.kr/openApi/restful/pblprfr', // base URL
  headers: {
    Accept: 'application/json',
  },
});

// API 요청 함수
const fetchPerformances = (params = {}) => {
  return api.get('/', {
    params: {
      ...params,
      service: API_KEY, // API_KEY를 쿼리 파라미터로 전달
    },
  });
};

// 요청 인터셉터 추가하기
api.interceptors.request.use(
  config => {
    // 요청이 전달되기 전에 작업 수행 (ex: 로딩 스피너 시작)
    return config;
  },
  error => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  response => {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행 (ex: 로딩 스피너 종료)
    return response;
  },
  error => {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행 (ex: 에러 메시지 표시)
    return Promise.reject(error);
  },
);

export default fetchPerformances;
