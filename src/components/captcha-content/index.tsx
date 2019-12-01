import * as React from "react";
// UI frameworks
import styled from "@emotion/styled";
// shared components
import AntdCheckBox from "../ant-checkbox";
import AntdButton from "../ant-button";
import { Row, Col } from "antd";
// types

interface NormalizeData {
  clause: string;
  isCorrect: boolean;
}
interface IProps {
  randomNumber: number;
  isCorrect: boolean;
  correctData: any[];
  uncorrectData: any[];
  maxNumberOfItems: number;
  setIsHuman: (isHuman: boolean) => void;
}
interface IState {
  dataArray: any[];
  correctNormalizedDataArray: any[];
  uncorrectNormalizedDataArray: any[];
  checkboxTruthArray: any[];
  checkboxFalsyArray: any[];
  selectedCheckboxes: any[];
  isHuman: boolean;
}
// styles
const Wrapper = styled.div`
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

const CheckBoxWrapper = styled.div<any>`
  text-align: left;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  input {
    margin-right: 5px;
  }
`;

function reducer(state: any, action: any) {
  return { ...state, ...action };
}

const CaptchaTitle: React.FC<IProps> = props => {
  const {
    randomNumber,
    isCorrect,
    correctData,
    uncorrectData,
    maxNumberOfItems,
    setIsHuman
  } = props;

  const initialState = (): IState => ({
    dataArray: [],
    correctNormalizedDataArray: [],
    uncorrectNormalizedDataArray: [],
    checkboxTruthArray: [],
    checkboxFalsyArray: [],
    selectedCheckboxes: [],
    isHuman: false
  });
  const [state, dispatch] = React.useReducer(reducer, initialState());

  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  function shuffle(a: number[]): number[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function normalizeArray(array: any[], isCorrect: boolean) {
    const normalized = array.map((item: any) => {
      let normalizedArr = item;
      if (item.clause) {
        normalizedArr = {
          clause: item.clause,
          isCorrect
        };
      } else if (typeof item === "string") {
        normalizedArr = {
          clause: item,
          isCorrect
        };
      }
      return normalizedArr;
    });
    return normalized;
  }

  /**
   * Generate random 16 radix via `Math.random` and convert a `string` then take the third character
   *
   * @returns {string}
   */
  function randomString(): string {
    return Math.random()
      .toString(16)
      .slice(2);
  }

  React.useEffect(() => {
    const tempCorrectData: any[] = normalizeArray(correctData, true);
    const tempUncorrectData: any[] = normalizeArray(uncorrectData, false);

    dispatch({
      correctNormalizedDataArray: tempCorrectData,
      uncorrectNormalizedDataArray: tempUncorrectData
    });
    const randomNum = getRndInteger(randomNumber, maxNumberOfItems - 1);

    const tempDataArray = [];

    const truthyData = isCorrect ? tempCorrectData : tempUncorrectData;
    const falsyData = !isCorrect ? tempCorrectData : tempUncorrectData;

    for (let i = 0; i < randomNum; i++) {
      tempDataArray.push(truthyData[getRndInteger(0, truthyData.length)]);
    }
    for (let i = 0; i < maxNumberOfItems - randomNum; i++) {
      tempDataArray.push(falsyData[getRndInteger(0, falsyData.length)]);
    }

    dispatch({ dataArray: shuffle(tempDataArray) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect, correctData, uncorrectData]);

  function handleCheckBoxChange({
    item,
    index
  }: {
    item: NormalizeData;
    index: number;
  }) {
    if (state.selectedCheckboxes.find((item: any) => item.index === index)) {
      dispatch({
        selectedCheckboxes: state.selectedCheckboxes.filter(
          (item: any) => item.index !== index
        )
      });
    } else {
      dispatch({
        selectedCheckboxes: state.selectedCheckboxes.concat([{ item, index }])
      });
    }
  }

  function handleClick() {
    const truthyItems = state.selectedCheckboxes.filter(
      (item: any) => item.item.isCorrect === isCorrect
    );
    const falsyItems = state.selectedCheckboxes.filter(
      (item: any) => item.item.isCorrect !== isCorrect
    );
    setIsHuman(falsyItems.length === 0 && truthyItems.length === randomNumber);
  }

  return (
    <Wrapper>
      {state.dataArray &&
        state.dataArray.map((item: NormalizeData, index: number) => (
          <CheckBoxWrapper key={randomString()}>
            <AntdCheckBox
              checked={Boolean(
                state.selectedCheckboxes.find(
                  (item: any) => item.index === index
                )
              )}
              onChange={() => handleCheckBoxChange({ item, index })}
            >
              {item.clause}
            </AntdCheckBox>
          </CheckBoxWrapper>
        ))}
      <Row>
        <Col span={12} offset={6}>
          <AntdButton onClick={handleClick} type="primary">
            submit
          </AntdButton>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default CaptchaTitle;
