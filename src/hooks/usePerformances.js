import { useQuery } from '@tanstack/react-query';
import fetchPerformances from '../utils/api'; // API 요청 함수

const usePerformanceQuery = params => {
  return useQuery({
    queryKey: ['performances', params],
    queryFn: () => fetchPerformances(params),
    select: data => data.dbs?.db || [], // 필요한 데이터만 선택할 수 있음
  });
};

export default usePerformanceQuery;
