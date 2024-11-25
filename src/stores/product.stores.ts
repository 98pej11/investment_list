import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "types/productList";
import { fetchProductList } from "api/productList"; // API 호출 함수

class ProductStore {
  products: Product[] = []; // 전체 상품 데이터
  amountFilter: number | "" = ""; // 최대 금액 필터
  lengthFilter: number | "" = ""; // 최대 기간 필터
  earningRateFilter: number | "" = ""; // 최소 수익률 필터
  titleFilter: string = ""; // 상품명 필터

  constructor() {
    makeAutoObservable(this); // MobX가 this를 바인딩하도록 보장
  }

  // 필터 설정 메서드
  setAmountFilter(value: string) {
    this.amountFilter = value === "" ? "" : parseInt(value, 10);
  }

  setLengthFilter(value: string) {
    this.lengthFilter = value === "" ? "" : parseInt(value, 10);
  }

  setEarningRateFilter(value: string) {
    this.earningRateFilter = value === "" ? "" : parseFloat(value);
  }

  setTitleFilter(value: string) {
    this.titleFilter = value;
  }

  // 필터링된 상품 리스트 계산
  get filteredProducts() {
    return this.products.filter((product) => {
      const matchesAmount =
        this.amountFilter === "" || product.amount <= this.amountFilter;
      const matchesLength =
        this.lengthFilter === "" || product.length <= this.lengthFilter;
      const matchesEarningRate =
        this.earningRateFilter === "" ||
        product.earningRate >= this.earningRateFilter;
      const matchesTitle = product.title
        .toLowerCase()
        .includes(this.titleFilter.toLowerCase());

      return (
        matchesAmount && matchesLength && matchesEarningRate && matchesTitle
      );
    });
  }

  search() {
    return this.filteredProducts;
  }

  // 상품 리스트 API 호출 및 상태 업데이트
  // runInAction 내에서 this 바인딩을 강제로 지정
  async fetchProducts() {
    try {
      const data = await fetchProductList(); // API 호출
      runInAction(() => {
        // this를 강제로 바인딩
        this.products = data; // 상품 데이터 업데이트
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const productStore = new ProductStore();
