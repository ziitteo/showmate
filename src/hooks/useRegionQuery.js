import { useQuery } from '@tanstack/react-query';
import fetchData from '../utils/api'; 
import { getStartDate, getEndDate } from '../utils/util'; 

// 공연 정보를 가져오는 React Query 훅
const useRegionQuery = (params = {}) => {
  const stdate = getStartDate(); // 시작 날짜 (오늘 기준 3개월 전)
  const eddate = getEndDate(); // 종료 날짜 (오늘 기준 1년 뒤)

  const defaultParams = {
    stdate,
    eddate,
    rows: 100, 
    cpage: 1, 
    ...params, 
  };

  return useQuery({
    queryKey: ['performances', defaultParams],
    queryFn: () => fetchData('/pblprfr', defaultParams), 
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
        signgucode : item.signgucode, // 시군구 코드 
      })) || [];
    },
  });
};

export default useRegionQuery;
