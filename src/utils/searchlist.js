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

    // 필요한 데이터 반환
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

// 공연 정보를 가져오는 API 요청 함수
const customFetchData = async (endpoint, params = {}) => {
  try {
    const response = await customApi.get(endpoint, {
      params: {
        service: API_KEY,
        ...params,
      },
    });

    const jsonData = parseXML(response.data); // 응답 데이터를 파싱

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
