import * as React from "react";
// UI frameworks
import styled from "@emotion/styled";
// types
interface IProps {
	randomNumber: number;
	isCorrect: boolean;
}
// styles
const Title = styled.h2`
	color: #555;
`;

const CaptchaTitle: React.FC<IProps> = props => {
	const { randomNumber, isCorrect } = props;
	return (
		<Title>
			select <strong>{randomNumber}</strong> number of <strong>{`${isCorrect ? "correct" : "uncorrect"}`}</strong> items
		</Title>
	);
};

export default CaptchaTitle;
