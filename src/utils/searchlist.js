import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const API_KEY = process.env.REACT_APP_API_KEY;

// XML을 JSON으로 변환하는 함수
const parseXML = (xmlData) => {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false, // XML 속성도 파싱하도록 설정
      attributeNamePrefix: "", // 속성명에 접두어 제거
      ignoreNameSpace: true, // 네임스페이스 무시
    });

    const jsonData = parser.parse(xmlData);

    // 파싱된 JSON 구조 출력
    console.log("Parsed JSON Data:", jsonData);

    // 특정 필드 확인 (예: totalCount, items)
    console.log("Total Count:", jsonData.dbs?.totalCount || 0);
    console.log("Items:", jsonData.dbs?.db || []);

    return jsonData;
  } catch (error) {
    console.error("XML Parsing Error:", error);
    return {}; // 에러 발생 시 빈 객체 반환
  }
};

const customApi = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "/api/openApi/restful",
  headers: {
    Accept: "application/xml",
  },
});

const customFetchData = async (endpoint, params = {}) => {
  try {
    // 요청 URL과 파라미터를 콘솔에 출력하여 확인
    console.log(
      `Request URL: ${customApi.defaults.baseURL}${endpoint}`,
      params
    );

    const response = await customApi.get(endpoint, {
      params: {
        service: API_KEY,
        ...params,
      },
    });

    // 응답의 원본 데이터와 파싱된 JSON 데이터를 모두 출력하여 확인
    console.log("Raw Response Data:", response.data);
    const jsonData = parseXML(response.data); // 응답 데이터를 파싱
    console.log("Parsed API Response:", jsonData);

    // 데이터 구조 확인을 위한 추가 로깅
    console.log("Items:", jsonData.dbs?.db || []);
    console.log("Total Count:", jsonData.dbs?.totalCount || 0);

    // 응답 구조에 따라 필요한 데이터 반환
    return jsonData;
  } catch (error) {
    // 에러 발생 시 응답 상태와 메시지를 자세히 출력
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    }
    console.error("Error Message:", error.message);
    throw new Error(`Custom API 요청 중 오류 발생: ${error.message}`);
  }
};

export default customFetchData;
