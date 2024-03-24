import styled from "styled-components";

export const Wrapper = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   gap: 20px;
`;

export const Tweets = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   gap: 10px;
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

export const EditProfileName = styled.button`
   cursor: pointer;
   background-color: white;
   color: black;
   font-weight: 600;
   border: 0;
   font-size: 12px;
   padding: 5px 10px;
   text-transform: uppercase;
   border-radius: 5px;
   margin-top: 20px;
`;

export const EditForm = styled.form``;

export const EditTextArea = styled.textarea`
   width: 100%;
   border: 2px solid white;
   border-radius: 10px;
   background-color: black;
   color: white;
   font-size: 18px;
   font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   resize: none;

   &::placeholder {
      font-size: 16px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   }
   &:focus {
      outline: none;
      border-color: #1d9bf0;
   }
`;

export const EditSubmit = styled.button`
   display: none;
`;

export const DoneLabel = styled.label`
   cursor: pointer;
   background-color: #5fff8c;
   color: antiquewhite;
   font-weight: 600;
   border: 0;
   font-size: 12px;
   padding: 5px 10px;
   text-transform: uppercase;
   border-radius: 5px;
`;
