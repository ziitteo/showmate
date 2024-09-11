import axios from "axios";

const API_KEY = "bf12e40f012c4d3d986da6cb893a26b7";
const BASE_URL = "/api/openApi/restful/boxoffice";
const BASE_IMAGE_URL = "https://kopis.or.kr";

const parseXMLToJSON = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "application/xml");

  const items = Array.from(xmlDoc.getElementsByTagName("boxof")).map(
    (boxof) => {
      const prfnm =
        boxof.getElementsByTagName("prfnm")[0]?.textContent || "제목 없음";
      const prfplcnm =
        boxof.getElementsByTagName("prfplcnm")[0]?.textContent ||
        "공연 장소 정보 없음";
      const prfpd =
        boxof.getElementsByTagName("prfpd")[0]?.textContent ||
        "상영 날짜 정보 없음";
      const poster = boxof.getElementsByTagName("poster")[0]?.textContent || "";
      const fullPosterUrl = poster.startsWith("http")
        ? poster
        : `${BASE_IMAGE_URL}${poster}`;

      return {
        prfnm,
        prfplcnm,
        prfpd,
        poster: fullPosterUrl,
      };
    }
  );

  return { boxofs: { boxof: items } };
};

export const fetchBoxOffice = async (ststype, date, genreCode = "AAAA") => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        service: API_KEY,
        ststype: ststype,
        date: date,
        catecode: genreCode,
      },
      responseType: "text",
    });

    const result = parseXMLToJSON(response.data);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
