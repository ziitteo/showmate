import { XMLParser } from 'fast-xml-parser';

// XML을 JSON으로 변환하는 함수
const parseXML = xmlData => {
  const parser = new XMLParser(); // fast-xml-parser 인스턴스 생성
  const jsonData = parser.parse(xmlData); // XML 데이터를 JSON으로 변환
  return jsonData;
};

// 날짜 포맷 함수
const getFormattedDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`; // 'YYYYMMDD' 형식으로 반환
};

// 오늘 날짜 계산하는 함수
const getToday = () => {
  const today = new Date();
  return getFormattedDate(today);
};

const getStartDate = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 3); // 3개월 전 날짜 계산
  return getFormattedDate(today);
};

const getEndDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() + 1); // 1년 뒤 날짜 계산
  return getFormattedDate(today);
};

export { parseXML, getToday, getStartDate, getEndDate };
