import * as React from "react";
// UI frameworks
import { Row, Col } from "antd";
// shared components
import AntdCheckBox from "../ant-checkbox";
import AntdButton from "../ant-button";
// styles
import { Wrapper, CheckBoxWrapper } from "./index.styled";
// types
interface DataProps {
  clause?: string;
}
interface NormalizeData extends DataProps {
  isCorrect: boolean;
}
interface IProps {
  randomNumber: number;
  isCorrect: boolean;
  correctData: DataProps[];
  uncorrectData: DataProps[];
  maxNumberOfItems: number;
  setIsHuman: (isHuman: boolean) => void;
}
interface Item {
  item: NormalizeData;
  index: number;
}
interface IState {
  dataArray?: NormalizeData[];
  correctNormalizedDataArray: NormalizeData[];
  uncorrectNormalizedDataArray: NormalizeData[];
  selectedCheckboxes: Item[];
}

function reducer(state: IState, action: any): IState {
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
    selectedCheckboxes: []
  });
  const [state, dispatch] = React.useReducer(reducer, initialState());

  /**
   * Shuffles array in place.
   * @param {Array} a items An array containing the items.
   */
  function shuffle(a: DataProps[]): DataProps[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * returns a random number between min and max
   *
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  /**
   * Normalizes the data
   *
   * @param {DataProps[]} array
   * @param {boolean} isCorrect
   * @returns {NormalizeData[]}
   */
  function normalizeArray(
    array: DataProps[],
    isCorrect: boolean
  ): NormalizeData[] {
    const normalized = array.map((item: any) => {
      let normalizedArr: NormalizeData = item;
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
    const tempCorrectData: NormalizeData[] = normalizeArray(correctData, true);
    const tempUncorrectData: NormalizeData[] = normalizeArray(
      uncorrectData,
      false
    );

    dispatch({
      correctNormalizedDataArray: tempCorrectData,
      uncorrectNormalizedDataArray: tempUncorrectData
    });

    const randomNum = getRndInteger(randomNumber, maxNumberOfItems - 1);

    const tempDataArray: NormalizeData[] = [];

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

  /**
   * Triggers when a checkbox changes
   *
   * @param {Object<item: NormalizeData, index: number>}
   */
  function handleCheckBoxChange({
    item,
    index
  }: {
    item: NormalizeData;
    index: number;
  }) {
    if (state.selectedCheckboxes.find((item: Item) => item.index === index)) {
      dispatch({
        selectedCheckboxes: state.selectedCheckboxes.filter(
          (item: Item) => item.index !== index
        )
      });
    } else {
      dispatch({
        selectedCheckboxes: state.selectedCheckboxes.concat([{ item, index }])
      });
    }
  }
  /**
   * triggers when the submit button clicked
   *
   */
  function handleClick() {
    const truthyItems = state.selectedCheckboxes.filter(
      (item: Item) => item.item.isCorrect === isCorrect
    );
    const falsyItems = state.selectedCheckboxes.filter(
      (item: Item) => item.item.isCorrect !== isCorrect
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
                  (item: Item) => item.index === index
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
