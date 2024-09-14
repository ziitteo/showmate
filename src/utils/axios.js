import axios from 'axios';

// 환경 변수에서 API 키 가져오기
// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = 'bf12e40f012c4d3d986da6cb893a26b7';

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: '/api/openApi/restful', // 프록시 경로를 통해 API 요청
  headers: {
    Accept: 'application/xml', // XML 응답 수락
    // CORS(Cross-Origin Resource Sharing) 정책을 우회하기 위해 모든 출처(origin)에서의 요청을 허용합니다. 이렇게 하면 브라우저에서의 클라이언트 사이드 호출에 제한을 두지 않습니다. 이 헤더를 서버 측에서 설정해야 실제로 CORS를 허용할 수 있다.
    'Access-Control-Allow-Origin': '*',
  },
  params: {
    service: API_KEY
  }
});
console.log('instance', instance)

export default instance;