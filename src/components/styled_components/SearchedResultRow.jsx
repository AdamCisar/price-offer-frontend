import styled, { css, keyframes } from "styled-components";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SearchedResultRow = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: auto;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 85%;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  transition: box-shadow 0.3s ease;
  animation: ${fadeIn} 0.4s ease-in-out forwards; 

  &:hover {
    box-shadow: 0px 0px 14px rgba(70, 70, 70, 0.5);
  }
`;

export default SearchedResultRow;