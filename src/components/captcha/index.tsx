import * as React from "react";
// UI frameworks
import styled from "@emotion/styled";
// shared components
import CaptchaTitle from "../captcha-title";
import CaptchaContent from "../captcha-content";
// data
import correctData from "../../data/correct-data.json";
import uncorrectData from "../../data/uncorrect-data.json";
// styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
`;
// types
interface IProps {
  maxNumberOfItems: number;
}

interface IState {
  randomNumber: number;
  isCorrect: boolean;
  isHuman: boolean;
}

function reducer(state: any, action: any) {
  return { ...state, ...action };
}

const Captcha: React.FC<IProps> = props => {
  const { maxNumberOfItems } = props;

  const initialState = (): IState => ({
    randomNumber: 0,
    isCorrect: true,
    isHuman: false
  });
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({
      randomNumber: Math.floor(Math.random() * (maxNumberOfItems - 1)) + 1,
      isCorrect: !!Math.floor(Math.random() * 2)
    });
  }, [maxNumberOfItems]);

  React.useEffect(() => {
    console.log("IS HUMAN", state.isHuman);
  });

  function changeIsHuman(isHuman: boolean) {
    dispatch({
      isHuman
    });
  }

  const { randomNumber, isCorrect, isHuman } = state;

  return (
    <Wrapper>
      <CaptchaTitle randomNumber={randomNumber} isCorrect={isCorrect} />
      <CaptchaContent
        randomNumber={randomNumber}
        isCorrect={isCorrect}
        correctData={correctData["en"]}
        uncorrectData={uncorrectData["en"]}
        maxNumberOfItems={maxNumberOfItems}
        isHuman={isHuman}
        setIsHuman={changeIsHuman}
      />
    </Wrapper>
  );
};

export default React.memo(Captcha);
