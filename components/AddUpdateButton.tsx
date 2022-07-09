import styled from "styled-components";

const AddUpdateButton = styled.div`
  display: flex;
  justify-content: flex-end;

  > button {
    background: #fff;
    width: 80px;
    height: 32px;
    cursor: pointer;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    transition: color 0.25s;
    margin-right: 16px;
  }

  > button:hover {
    background: #dee2e6;
  }
`;

export default AddUpdateButton;
