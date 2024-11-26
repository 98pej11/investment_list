import axios from "axios";

const BASE_URL = "https://temp-test.d2sqh8spejkbjc.amplifyapp.com/api/test";

export const fetchProductList = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("상품 목록 가져오기 실패", error);
    throw error;
  }
};
