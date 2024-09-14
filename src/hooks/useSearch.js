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
  // 기본 파라미터 설정
  const defaultParams = {
    rows: 24, // 한 페이지당 아이템 수
    ...(searchTerm.trim() !== "" ? { shprfnm: searchTerm } : {}),
    ...(genre ? { shcate: genre } : {}),
    ...(saleStatus ? { prfstate: saleStatus } : {}),
    ...(regionCode ? { signgucode: regionCode } : {}),
    cpage: page,
    ...params,
  };

  console.log("Request Parameters:", defaultParams); // 파라미터 확인용 로그

  // API 요청 함수 정의
  return useQuery({
    queryKey: ["search", defaultParams],
    queryFn: async () => {
      const result = await fetchData("/pblprfr", defaultParams);
      console.log("API Response:", result); // 전체 응답 데이터 확인
      return result;
    },
    select: (data) => {
      console.log("Response Data:", data.dbs); // 응답 구조 확인
      const items = data.dbs?.db || [];

      // 아이템의 개수를 이용해 totalCount 계산
      const totalCount = items.length; // 응답에서 개수를 직접 계산

      return {
        items,
        totalCount,
        totalPages: Math.ceil(totalCount / defaultParams.rows),
      };
    },
  });
};

export default useSearchQuery;
