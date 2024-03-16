import styled from "styled-components";

export const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

export const TextArea = styled.textarea`
   border: 2px solid white;
   border-radius: 20px;
   padding: 20px;
   font-size: 16px;
   background-color: black;
   color: white;
   resize: none;
   font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

   &::placeholder {
      font-size: 16px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
   }
   &:focus {
      outline: none;
      border-color: #1d9bf0;
   }
`;

export const AttachFileButton = styled.label`
   cursor: pointer;
   padding: 10px 20px;
   color: #1d9bf0;
   text-align: center;
   border-radius: 20px;
   border: 1px solid #1d9bf0;
   font-size: 14px;
   font-weight: 600;
`;

export const AttachFileInput = styled.input`
   display: none;
`;

export const SubmitButton = styled.input`
   background-color: #1d9bf0;
   color: white;
   border: none;
   border-radius: 20px;
   padding: 10px 20px;
   font-size: 16px;
   cursor: pointer;

   &:hover,
   &:active {
      opacity: 0.8;
   }
`;
