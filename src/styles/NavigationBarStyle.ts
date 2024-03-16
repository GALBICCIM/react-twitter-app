import styled from "styled-components";

export const Wrapper = styled.div`
   display: grid;
   gap: 20px;
   grid-template-columns: 1fr 4fr;
   padding: 50px 0px;
   height: 100%;
   width: 100%;
   max-width: 860px;
`;

export const Menu = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 20px;
`;

export const MenuItem = styled.div`
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   border: 2px solid white;
   height: 50px;
   width: 50px;
   border-radius: 50%;

   svg {
      width: 30px;
      fill: white;
   }

   &.log-out {
      border-color: tomato;

      svg {
         fill: tomato;
      }
   }
`;
