import { useQuery } from '@tanstack/react-query';
import fetchData from '../utils/api'; // 공통 API 요청 함수
import { getStartDate, getEndDate } from '../utils/util'; // 날짜 관련 유틸 함수

// 공연 정보를 가져오는 React Query 훅
const useRegionQuery = (params = {}) => {
  const stdate = getStartDate(); // 시작 날짜 (오늘 기준 3개월 전)
  const eddate = getEndDate(); // 종료 날짜 (오늘 기준 1년 뒤)

  const defaultParams = {
    stdate,
    eddate,
    rows: 48, // 한 번에 가져올 데이터 수 (최대 100)
    cpage: 1, // 현재 페이지
    ...params, // 추가적인 파라미터 병합
  };

  return useQuery({
    queryKey: ['performances', defaultParams],
    queryFn: () => fetchData('/pblprfr', defaultParams), // KOPIS API로부터 공연 정보 가져오기
    select: data => {
      // KOPIS API 응답에서 필요한 정보만 추출
      return data.dbs?.db.map(item => ({
        id: item.mt20id,           // 공연 ID
        poster: item.poster,       // 공연 포스터 URL
        title: item.prfnm,         // 공연 제목
        start: item.prfpdfrom,     // 공연 시작일
        end : item.prfpdto,        // 공연 종료일
        venue: item.fcltynm,       // 공연 장소
        area: item.area,           // 공연 지역 
        rank: item.rnum,           // 공연 인기순
        saleStatus: item.saleStatus, // 판매 상태
      })) || [];
    },
  });
};

export default useRegionQuery;
