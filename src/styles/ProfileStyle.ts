import styled from "styled-components";

export const Wrapper = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 20px;
`;

export const AvatarUpload = styled.label`
   cursor: pointer;
   width: 80px;
   height: 80px;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: hidden;
   border-radius: 50%;
   background-color: #1d9bf0;

   svg {
      width: 50px;
   }
`;

export const AvatarImg = styled.img`
   width: 100%;
`;

export const AvatarInput = styled.input`
   display: none;
`;

export const Name = styled.span`
   font-size: 22px;
`;
