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
  // 검색어가 공란일 때 전체 데이터를 가져오도록 기본 파라미터 설정
  const defaultParams = {
    rows: 12, // 한 번에 가져올 데이터 수 (페이지당 아이템 수)
    ...(searchTerm ? { shprfnm: searchTerm } : {}), // 공연 이름에 검색어 포함, 검색어가 없으면 전체 리스트
    ...(genre ? { shcate: genre } : {}), // 장르가 선택되었을 경우 필터링 추가
    ...(saleStatus ? { prfstate: saleStatus } : {}), // 판매 상태가 선택되었을 경우 필터링 추가
    ...(regionCode ? { signgucode: regionCode } : {}), // 지역 코드가 선택되었을 경우 필터링 추가
    cpage: page, // 현재 페이지 번호
    ...params,
  };

  // useQuery로 검색 데이터를 가져오는 로직 구현
  return useQuery({
    queryKey: ["search", defaultParams], // 쿼리 키 설정

    // API 요청 함수 정의
    queryFn: async () => {
      const result = await fetchData("/pblprfr", defaultParams);
      return result;
    },

    // 필요한 데이터 선택
    select: (data) => data.dbs?.db || [],
  });
};

export default useSearchQuery;
