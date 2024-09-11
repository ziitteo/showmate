import { useInfiniteQuery } from '@tanstack/react-query';
import fetchData from '../utils/api'; // 공통 API 요청 함수
import { getStartDate, getEndDate } from '../utils/util'; // 날짜 관련 유틸 함수

// 뮤지컬 전체 정보를 가져오는 API 요청 함수
const useGenreQuery = (categoryCode, params = {}) => {
  const stdate = getStartDate(); // 시작 날짜 오늘 기준 3개월 전
  const eddate = getEndDate(); // 종료 날짜 오늘 기준 1년 뒤

  const defaultParams = {
    stdate,
    eddate,
    shcate: categoryCode, // 장르별 카테고리 코드 ( 뮤지컬, 콘서트, 연극 등)
    rows: 20, // 한 번에 가져올 데이터 개수 (20개씩)
    ...params, // 추가적인 파라미터가 있을 경우 병합
  };

  return useInfiniteQuery({
    queryKey: ['musicals', defaultParams],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await fetchData('/pblprfr', { ...defaultParams, cpage: pageParam });
      console.log('Fetching page:', pageParam); // 현재 페이지 번호 로그 출력
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.totalCount / defaultParams.rows);
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined; // 다음 페이지가 있으면 다음 페이지 번호 반환
    },
    select: data => data.pages.flatMap(page => page.dbs?.db || []), // 모든 페이지 데이터를 하나의 배열로 반환
  });
};

export default useGenreQuery;
