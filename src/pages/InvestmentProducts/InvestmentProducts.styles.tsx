import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }
`;
