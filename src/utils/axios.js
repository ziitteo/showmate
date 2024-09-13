import axios from 'axios';

// 환경 변수에서 API 키 가져오기
// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = 'bf12e40f012c4d3d986da6cb893a26b7';

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: '/api/openApi/restful', // 프록시 경로를 통해 API 요청
//   headers: {
//     Accept: 'application/xml', // XML 응답 수락
//   },
  params: {
    service: API_KEY
  }
});
console.log('instance', instance)

export default instance;