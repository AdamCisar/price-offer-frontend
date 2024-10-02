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
  width: 85%;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease;
  animation: ${fadeIn} 0.5s ease-in-out forwards; 

  &:hover {
    background-color: black;
    color: white;
  }
`;

export default SearchedResultRow;