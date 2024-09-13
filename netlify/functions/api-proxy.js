// 'axios'는 HTTP 요청을 쉽게 보낼 수 있게 해주는 라이브러리, 이를 사용해 외부 API로 요청 보내기
const axios = require('axios');

// Netlify 함수 핸들러를 정의 이 함수는 클라이언트에서 API 요청을 받을 때 호출
exports.handler = async function (event) {
  try {
    // Base API URL을 설정, 이 URL은 실제 외부 API 서버의 엔드포인트를 가리킴
    const baseURL = 'https://kopis.or.kr/openApi/restful';
    
    // event 객체에서 클라이언트가 보낸 쿼리 스트링 파라미터를 가져옴
    // 'endpoint'는 API 엔드포인트를 지정하며, 나머지 쿼리 스트링 파라미터는 'params'에 저장
    const { endpoint, ...params } = event.queryStringParameters;

    // 실제 외부 API로 요청을 보내는 부분
    // 'baseURL'과 'endpoint'를 합쳐 최종 API URL을 만들고, 클라이언트가 보낸 추가 파라미터도 함께 전송
    const response = await axios.get(`${baseURL}/${endpoint}`, {
      params: {
        service: process.env.REACT_APP_API_KEY, // API 요청 시 필요한 API 키를 환경 변수에서 가져와 추가
        ...params, // 클라이언트에서 요청한 나머지 파라미터들을 추가
      },
    });
    
    // API로부터 받은 응답 데이터를 클라이언트에 JSON 형식으로 반환
    // HTTP 상태 코드는 200(성공)을 반환하고, 응답 데이터는 JSON으로 변환하여 전송
    return {
      statusCode: 200,
      body: JSON.stringify(response.data), // 외부 API에서 받은 데이터를 클라이언트에 전달
    };
  } catch (error) {
    // 만약 요청 처리 중에 에러가 발생하면, 에러 메시지를 클라이언트에게 반환
    // HTTP 상태 코드는 500(서버 에러)를 반환하고, 에러 메시지를 JSON으로 변환하여 전송
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }), // 에러 메시지를 클라이언트에 전달
    };
  }
};