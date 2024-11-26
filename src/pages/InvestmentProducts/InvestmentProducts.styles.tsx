import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  text-align: center;
`;

export const Title = styled.div`
  padding: 30px;
  font-size: 30px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
