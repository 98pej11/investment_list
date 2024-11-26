import { makeAutoObservable, runInAction } from "mobx";

import { Product } from "types/productType";
import { fetchProductList } from "api/productList"; // API 호출 함수
import { SortOption, sortOptions } from "types/sortOptions";

class ProductStore {
  products: Product[] = []; // 전체 상품 데이터
  amountFilter: number | "" = ""; // 최대 금액 필터
  lengthFilter: number | "" = ""; // 최대 기간 필터
  earningRateFilter: number | "" = ""; // 최소 수익률 필터
  titleFilter: string = ""; // 상품명 필터
  sortOption: string = ""; // 정렬 옵션

  constructor() {
    makeAutoObservable(this); // MobX가 this를 바인딩하도록 보장
  }

  // 필터 초기화 메서드
  resetFilters() {
    this.amountFilter = "";
    this.lengthFilter = "";
    this.earningRateFilter = "";
    this.titleFilter = "";
    this.sortOption = "";
    this.fetchProducts();
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

  setSortOption(option: string) {
    this.sortOption = option; // 정렬 옵션 업데이트
  }

  get sortOptionLabel() {
    return (
      sortOptions[this.sortOption as SortOption]?.label || "정렬 기준 선택"
    );
  }

  get filteredProducts() {
    const filtered = this.products.filter((product) => {
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

    // 정렬 적용
    return this.sortProducts(filtered);
  }

  sortProducts(products: Product[]) {
    const sorted = [...products];

    const option = sortOptions[this.sortOption as SortOption];
    if (option) {
      return sorted.sort(option.sortFunc);
    }

    return sorted; // 정렬 옵션이 없을 경우 필터링된 상품만 반환
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
