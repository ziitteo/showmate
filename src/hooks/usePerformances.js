import { useQuery } from '@tanstack/react-query';
import fetchPerformances from '../utils/api';

const usePerformancesQuery = (params = {}) => {
  return useQuery({
    queryKey: ['performances', params], // queryKey는 캐시 관리를 위한 고유 값
    queryFn: () => fetchPerformances(params), // API 호출 함수
    select: result => result.data, // 응답 데이터 중 필요한 부분 선택
    enabled: !!params, // params가 있을 때만 쿼리 실행
  });
};

export default usePerformancesQuery;
