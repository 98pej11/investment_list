import axios from "axios";

// API 기본 URL 설정
const BASE_URL = "https://temp-test.d2sqh8spejkbjc.amplifyapp.com/api/test";

// 상품 목록 데이터를 가져오는 API 호출 함수
export const fetchProductList = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; // 에러 발생 시 호출한 쪽에서 처리
  }
};
