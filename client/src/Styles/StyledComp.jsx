import styled from "styled-components";

export const StyledInput = styled.input`
  border-radius: 3px;
  border-style: solid;
  outline: none;
  autocomplete: off;
  width: auto;

  &::placeholder {
    text-align: center;
  }
`;

export const StyledTextArea = styled.textarea`
  font-size: 2.4vh;
  border: solid;
  resize: horizontal;
  outline: none;

  &::placeholder {
    font-size: 3vh;
    text-align: center;
  }
`;
