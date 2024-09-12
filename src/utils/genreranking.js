// utils/util.js
import { XMLParser } from "fast-xml-parser";

// XML을 JSON으로 변환하는 함수
const parseXML = (xmlData) => {
  try {
    const parser = new XMLParser();
    const jsonData = parser.parse(xmlData);
    console.log("Parsed XML Data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("XML 파싱 오류 발생:", error);
    return {};
  }
};

// 날짜 포맷 함수
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

// 기간에 따른 날짜 계산 함수
const getDateForPeriod = (period) => {
  const today = new Date();
  switch (period) {
    case "day":
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return getFormattedDate(yesterday);
    case "week":
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(today.getDate() - 7);
      return getFormattedDate(oneWeekAgo);
    case "month":
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      return getFormattedDate(oneMonthAgo);
    default:
      return getFormattedDate(today);
  }
};

export { parseXML, getDateForPeriod };
