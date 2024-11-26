import { makeAutoObservable, runInAction } from "mobx";

import { Product } from "types/productType";
import { SortOption, sortOptions } from "types/sortOptions";

import { fetchProductList } from "api/productList";

class ProductStore {
  products: Product[] = []; // 전체 상품 데이터
  amountFilter: number | "" = ""; // 최대 금액 필터
  lengthFilter: number | "" = ""; // 최대 기간 필터
  earningRateFilter: number | "" = ""; // 최소 수익률 필터
  titleFilter: string = ""; // 상품명 필터
  sortOption: string = ""; // 정렬 옵션

  constructor() {
    makeAutoObservable(this);
  }

  // 필터 초기화
  resetFilters() {
    this.amountFilter = "";
    this.lengthFilter = "";
    this.earningRateFilter = "";
    this.titleFilter = "";
    this.sortOption = "";
    this.fetchProducts();
  }

  // 필터 설정
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
    this.sortOption = option;
  }

  // 정렬 옵션 라벨명
  get sortOptionLabel() {
    return (
      sortOptions[this.sortOption as SortOption]?.label || "정렬 기준 선택"
    );
  }

  // 필터 목록
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
        .includes(this.titleFilter.toLowerCase()); // 소문자 고려

      return (
        matchesAmount && matchesLength && matchesEarningRate && matchesTitle
      );
    });

    return this.sortProducts(filtered);
  }

  // 목록 정렬
  sortProducts(products: Product[]) {
    const sorted = [...products];

    const option = sortOptions[this.sortOption as SortOption];
    if (option) {
      return sorted.sort(option.sortFunc);
    }

    return sorted;
  }

  search() {
    return this.filteredProducts;
  }

  // 상품 리스트 API 호출 및 상태 업데이트
  async fetchProducts() {
    try {
      const data = await fetchProductList();
      runInAction(() => {
        this.products = data;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export const productStore = new ProductStore();
