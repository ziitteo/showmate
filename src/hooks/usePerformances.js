import { useQuery } from '@tanstack/react-query';
import fetchData from '../utils/api'; // 공통 API 요청 함수
import { getStartDate, getEndDate } from '../utils/util'; // 날짜 관련 유틸 함수

// 공연 전체 정보를 가져오는 API 요청 함수
const usePerformanceQuery = (params = {}) => {
  const stdate = getStartDate(); // 시작 날짜 오늘 기준 3개월 전
  const eddate = getEndDate(); // 종료 날짜 오늘 기준 1년 뒤

  const defaultParams = {
    stdate,
    eddate,
    rows: 10, // 최대 10개의 데이터를 가져옴
    cpage: 1, // 페이지 번호
    ...params, // 추가적인 파라미터가 있을 경우 병합
  };

  return useQuery({
    queryKey: ['performances', defaultParams],
    queryFn: () => fetchData('/pblprfr', defaultParams), // 공연 목록 데이터 요청
    select: data => data.dbs?.db || [], // 필요한 데이터만 선택할 수 있음
  });
};

export default usePerformanceQuery;
