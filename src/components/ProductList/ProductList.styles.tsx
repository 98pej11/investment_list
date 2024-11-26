import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 기본적으로 한 줄에 4개 */
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 화면이 좁아지면 한 줄에 3개 */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 태블릿 이하에서는 한 줄에 2개 */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); /* 모바일에서는 한 줄에 1개 */
  }
`;

export const Card = styled.div`
  display: grid;
  grid-template-areas: "image" "title" "info";
  grid-template-rows: repeat(3, fit-content(100%));
  row-gap: 10px;

  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 10px 15px 10px;
  text-align: center;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    grid-area: image;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export const Title = styled.div`
  grid-area: title;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Info = styled.div`
  grid-area: info;
  color: #979696;
  font-weight: bold;
  font-size: 15px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    color: ${({ theme }) => theme.text};

    &.highlight {
      color: #e74c3c; /* 수익률 강조 색상 */
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }
`;
