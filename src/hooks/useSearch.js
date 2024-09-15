import { useQuery } from "@tanstack/react-query";
import customFetchData from "../utils/searchlist"; // 올바르게 import

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
    cpage: page, // 현재 페이지 설정
    ...(searchTerm.trim() !== "" ? { shprfnm: searchTerm } : {}),
    ...(genre ? { shcate: genre } : {}),
    ...(saleStatus ? { prfstate: saleStatus } : {}),
    ...(regionCode ? { signgucode: regionCode } : {}),
    ...params,
  };

  return useQuery({
    queryKey: ["search", defaultParams],
    queryFn: async () => {
      const result = await customFetchData("/pblprfr", defaultParams);
      return result;
    },
    select: (data) => {
      const items = data.dbs?.db || [];
      const totalCount = data.dbs?.totalCount || items.length; // 응답에서 개수를 직접 계산
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
