import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 20px 0px 40px;
  gap: 10px; /* 입력 요소 사이 간격 */

  @media (max-width: 700px) {
    flex-direction: column; /* 화면 크기가 400px 이하일 때 세로로 정렬 */
  }
`;

export const Input = styled.input`
  width: 100%; /* 가로 너비를 부모 기준으로 꽉 채움 */
  height: 40px;
  padding: 10px; /* 여백 추가 */
  font-size: 16px; /* 텍스트 크기 */
  border: 1px solid #ccc; /* 테두리 설정 */
  border-radius: 4px; /* 모서리 둥글게 */
  box-sizing: border-box; /* 패딩을 포함한 전체 너비 계산 */
  outline: none;
`;

export const Button = styled.button`
  width: 300px;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
