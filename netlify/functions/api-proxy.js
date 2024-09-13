const axios = require('axios');
const { parseXML } = require('./src/utils/util');

// Netlify 함수 핸들러 정의
exports.handler = async function (event) {
  try {
    // Base API URL 설정
    const baseURL = 'http://kopis.or.kr/openApi/restful';

    // 클라이언트에서 전달된 쿼리 스트링 파라미터를 추출
    const params = event.queryStringParameters;
    const endpoint = params.endpoint || 'pblprfr'; // 기본 엔드포인트 제공

    // 외부 API로 XML 응답을 받기
    const response = await axios.get(`${baseURL}/${endpoint}`, {
      params: {
        service: process.env.REACT_APP_API_KEY, // API 키 추가
        ...params, // 나머지 쿼리 파라미터 추가
      },
      headers: {
        Accept: 'application/xml', // XML 형식의 응답을 수락
      },
    });

    // XML 데이터를 JSON으로 변환
    const jsonData = parseXML(response.data);

    // 성공적인 응답을 반환 (JSON 형식으로)
    return {
      statusCode: 200,
      body: JSON.stringify(jsonData),
    };
  } catch (error) {
    // 에러 발생 시 로그 출력
    console.error('API 요청 중 오류 발생:', error.message);

    // 500 오류와 함께 에러 메시지 반환
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `API 요청 중 오류 발생: ${error.message}` }),
    };
  }
};
