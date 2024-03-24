import styled from "styled-components";

export const Wrapper = styled.div`
   display: grid;
   grid-template-columns: 3fr 1fr;
   padding: 20px;
   border: 1px solid rgba(255, 255, 255, 0.5);
   border-radius: 15px;
`;

export const Columns = styled.div``;

export const Form = styled.form`
   width: 90%;
   display: flex;
   flex-direction: column;
   gap: 10px;
`;

export const Username = styled.span`
   font-weight: 600;
   font-size: 15px;
`;

export const Payload = styled.p`
   margin: 10px 0px;
   font-size: 18px;
`;

export const Photo = styled.img`
   width: 100px;
   height: 100px;
   border-radius: 15px;
`;

export const DeleteButton = styled.button`
   cursor: pointer;
   background-color: tomato;
   color: white;
   font-weight: 600;
   border: 0;
   font-size: 12px;
   padding: 5px 10px;
   text-transform: uppercase;
   border-radius: 5px;
   margin-top: 20px;
`;

export const EditButton = styled.button`
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

export const DoneLabel = styled.label`
   cursor: pointer;
   width: 20%;
   background-color: #5fff8c;
   color: antiquewhite;
   font-weight: 600;
   border: 0;
   font-size: 12px;
   padding: 5px 10px;
   text-transform: uppercase;
   border-radius: 5px;
`;

export const EditTextArea = styled.textarea`
   display: grid;
   grid-template-columns: 3fr 1fr;
   margin: 10px 0;
   padding-bottom: 30px;
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

export const EditSubmit = styled.input`
   display: none;
`;
