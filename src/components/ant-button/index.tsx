import * as React from "react";
// UI Frameworks
import { Button as AntdButton } from "antd";
import { ButtonProps } from "antd/lib/button";
// types
interface IProps extends ButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<IProps> = (
  { className, children, ...restProps },
  ref
) => {
  return (
    <AntdButton {...restProps} ref={ref}>
      {children}
    </AntdButton>
  );
};

export default React.forwardRef(Button);
