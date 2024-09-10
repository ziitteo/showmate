// import axios from 'axios';
// import { XMLParser } from 'fast-xml-parser';
// // import { parseStringPromise } from 'xml2js';

// const API_KEY = 'bf12e40f012c4d3d986da6cb893a26b7';
// const BASE_URL = '/openApi/restful/boxoffice';

// // 예매상황판 조회 함수
// export const fetchBoxOffice = async (ststype, date, genreCode = 'AAAA') => {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         service: API_KEY,
//         ststype: ststype,
//         date: date,
//         catecode: genreCode,
//       },
//       responseType: 'text',
//     });

//     // XML 데이터를 JSON으로 변환
//     const result = await parseStringPromise(response.data);
//     console.log('예매상황판 조회 데이터:', result);
//     return result;
//   } catch (error) {
//     console.error('예매상황판 조회 에러:', error);
//     throw error;
//   }
// };