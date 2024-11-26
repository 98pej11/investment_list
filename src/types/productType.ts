/** 상품 데이터 타입 정의 */
export interface Product {
  index: number; // 상품 아이디
  amount: number; // 투자 금액
  length: number; // 투자 기간
  title: string; // 상품명
  earningRate: number; // 수익률
  thumbnail: string; // 썸네일 이미지 URL
}
