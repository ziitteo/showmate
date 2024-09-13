import { useQuery } from '@tanstack/react-query';
import fetchData from '../utils/api'; // 공통 API 요청 함수
import { getToday } from '../utils/util'; // 날짜 관련 유틸 함수

// 뮤지컬 랭킹을 가져오는 API 요청 함수
const useMusicalRankingQuery = (params = {}) => {
  const today = getToday(); // 오늘 날짜

  const defaultParams = {
    ststype: 'month', // 월간 랭킹
    date: today, // 오늘 날짜 기준
    catecode: 'GGGA', // 뮤지컬 카테고리 코드
    ...params, // 추가적인 파라미터가 있을 경우 병합
  };

  return useQuery({
    queryKey: ['musicalRanking', defaultParams],
    queryFn: () => fetchData('/boxoffice', defaultParams), // 뮤지컬 랭킹 데이터 요청
    elect: data => data.boxofs?.boxof || [], // 필요한 데이터만 선택할 수 있음
  });
};

export default useMusicalRankingQuery;