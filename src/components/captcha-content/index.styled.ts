// UI frameworks
import styled from "@emotion/styled";
// types

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  .ant-checkbox-wrapper {
    text-align: left;
    margin-left: 0;
    padding-left: 20px;
  }
`;

export const CheckBoxWrapper = styled.div<any>`
  text-align: left;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  input {
    margin-right: 5px;
  }
`;
