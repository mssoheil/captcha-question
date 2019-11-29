import * as React from "react";
// UI Frameworks
import { Checkbox as AntdCheckBox } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
// types
interface IProps extends CheckboxProps {
	children?: React.ReactNode;
}

const Checkbox: React.FC<IProps> = ({ className, children, ...restProps }, ref) => {
	return (
		<AntdCheckBox {...restProps} ref={ref}>
			{children}
		</AntdCheckBox>
	);
};

export default React.forwardRef(Checkbox);
