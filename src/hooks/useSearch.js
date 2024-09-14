import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/api";
const useSearchQuery = (
  searchTerm,
  page = 1,
  genre = "",
  saleStatus = "",
  regionCode = "",
  params = {}
) => {
  const defaultParams = {
    rows: 24, // 한 페이지당 아이템 수
    ...(searchTerm.trim() !== "" ? { shprfnm: searchTerm } : {}),
    ...(genre ? { shcate: genre } : {}),
    ...(saleStatus ? { prfstate: saleStatus } : {}),
    ...(regionCode ? { signgucode: regionCode } : {}),
    cpage: page, // 현재 페이지 번호를 설정
    ...params,
  };

  return useQuery({
    queryKey: ["search", defaultParams],
    queryFn: async () => {
      // API 요청 시 현재 페이지와 목록 수가 올바르게 전달되는지 확인
      const result = await fetchData("/pblprfr", defaultParams);
      return result;
    },
    select: (data) => {
      const items = data.dbs?.db || [];
      const totalCount = data.dbs?.totalCount || 0; // 총 아이템 개수를 API 응답에서 가져옴
      const totalPages = Math.ceil(totalCount / defaultParams.rows); // 전체 페이지 수 계산

      return {
        items,
        totalCount,
        totalPages,
      };
    },
  });
};

export default useSearchQuery;
