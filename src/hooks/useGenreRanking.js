import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/api";
import { getDateForPeriod } from "../utils/genreranking";

const useGenreRankingQuery = (period, categoryCode, params = {}) => {
  const date = getDateForPeriod("day");

  const defaultParams = {
    service: process.env.REACT_APP_API_KEY,
    ststype: period,
    date: date, // 어제 날짜 사용
    catecode: categoryCode,
    ...params,
  };

  return useQuery({
    queryKey: ["rankingData", defaultParams],
    queryFn: async () => {
      try {
        console.log("Request Params:", defaultParams);
        const response = await fetchData("/boxoffice", defaultParams);
        console.log("API Response:", response);

        if (
          response &&
          response.boxofs &&
          typeof response.boxofs === "object" &&
          Array.isArray(response.boxofs.boxof)
        ) {
          console.log("Valid Response:", response.boxofs.boxof);
          return response.boxofs.boxof;
        }

        console.warn("Unexpected data structure or empty response:", response);
        return [];
      } catch (error) {
        console.error(
          "API 요청 중 오류 발생:",
          error.message,
          "응답:",
          error.response?.data || "N/A"
        );
        return [];
      }
    },
    select: (data) => data || [],
  });
};

export default useGenreRankingQuery;
