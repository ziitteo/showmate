import { useInfiniteQuery } from '@tanstack/react-query';
import fetchData from '../utils/api';
import { getStartDate, getEndDate } from '../utils/util';

// 장르별 공연 정보를 가져오는 커스텀 훅
// categoryCode: 장르별 카테고리 코드 (뮤지컬, 콘서트 등)
// params: 추가적인 파라미터 객체
const useGenreQuery = (categoryCode, params = {}) => {
  const stdate = getStartDate(); // 시작 날짜
  const eddate = getEndDate(); // 종료 날짜

  // API 호출에 사용할 기본 파라미터 설정
  const defaultParams = {
    stdate,
    eddate,
    shcate: categoryCode, // 장르별 카테고리 코드 (뮤지컬, 콘서트 등)
    rows: 40, // 한 번에 가져올 데이터 수
    ...params, // 추가적인 파라미터가 있을 경우 병합하여 API 요청에 사용
  };

  // useInfiniteQuery 훅 사용하여 무한 스크롤 데이터를 가져오는 로직을 구현
  // queryKey: 쿼리 키 설정, 캐시를 식별하는데 사용
  // queryFn: 데이터를 가져오는 비동기 함수
  return useInfiniteQuery({
    queryKey: ['genre', defaultParams], // 쿼리 키 설정

    // queryFn: 페이지 번호를 받아서 API 요청을 보내는 함수
    // pageParam: 페이지 번호 (기본값: 1)
    queryFn: async ({ pageParam = 1 }) => {
      // fetchData 함수를 사용하여 API 요청 '/pblprfr' 엔드포인트에 기본 파라미터와 페이지 번호를 전달
      const result = await fetchData('/pblprfr', { ...defaultParams, cpage: pageParam }); // API 요청 실행

      // API 요청 결과를 반환, 이 값이 NextPageParam 함수의 lastPage 인자로 전달됨
      return result;
    },

    // getNextPageParam: 다음 페이지 번호를 계산하는 함수
    // 마지막 페이지(lastPage)와 모든 페이지(allPages)를 받아서 다음 페이지 번호를 반환
    getNextPageParam: (lastPage, allPages) => {
      // lastPage 또는 totalCount가 없을 경우 더 이상 페이지가 없다고 판단하여 undefined 반환
      if (!lastPage || !lastPage.totalCount) {
        // totalCount가 없을 경우 임시로 다음 페이지를 설정하여 계속 페칭하도록 처리
        const nextPage = allPages.length + 1;

        // 데이터를 40개씩 요청하므로, lastPage의 데이터 개수가 40보다 적으면 마지막 페이지로 간주
        // 만약 totalCount가 없을 때 페이지네이션이 어떻게 처리되는지 알 수 없으므로, 임시로 40개 기준으로 계산
        return lastPage?.dbs?.db?.length === 40 ? nextPage : undefined;
      }

      // totalCount가 있을 때의 정상적인 페이지 계산
      // 전체 페이지 수 계산 (totalCount / 한 페이지당 데이터 수)
      const maxPages = Math.ceil(lastPage.totalCount / defaultParams.rows); // 전체 페이지 수 계산
      // 현재까지 가져온 모든 페이지 수를 기반으로 다음 페이지 번호를 계싼
      const nextPage = allPages.length + 1; // 다음 페이지 번호 계산

      // 다음 페이지가 전체 페이지 수를 넘지 않으면 nextPage 반환, 넘으면 undefined
      return nextPage <= maxPages ? nextPage : undefined;
    },
    // select: 쿼리 결과에서 필요한 데이터를 추출하는 함수
    select: data => data.pages.flatMap(page => page.dbs?.db || []), // 페이지 데이터를 하나의 배열로 병합
  });
};

export default useGenreQuery;
