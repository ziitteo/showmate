import { useQuery } from "@tanstack/react-query"
import fetchData from '../utils/api'; // 공통 API 요청 함수

export const useDetailInfoQeury = (id) => {
  console.log('id', id)
  return useQuery({
    queryKey:['details', id],
    queryFn:() => fetchData(`/pblprfr/${id}`),
    select: data => data.dbs?.db || []
  })
}

export default useDetailInfoQeury;