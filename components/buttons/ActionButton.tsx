import { FC, FormEventHandler, MouseEventHandler } from "react";
import { BiLoader } from "react-icons/bi";
import classNames from "classnames";

interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  bgColor?: string;
  textColor?: string;
  padding?: string;
  borderRadius?: string;
  hoverBgColor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ActionButton: FC<Props> = ({
  disabled,
  busy = false,
  title,
  onClick,
  bgColor = "bg-nav",
  textColor = "text-highlight-dark",
  padding = "px-6 py-2",
  borderRadius = "rounded",
  hoverBgColor = "hover:bg-green-900",
}): JSX.Element => {
  const buttonClasses = classNames(
    bgColor,
    textColor,
    padding,
    borderRadius,
    hoverBgColor,
    "border-none", // Add common button classes here
    "cursor-pointer",
    "focus:outline-none"
  );
  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      <span>{title}</span>
      {busy && <BiLoader className="animate-spin" size={20} />}
    </button>
  );
};

export default ActionButton;
