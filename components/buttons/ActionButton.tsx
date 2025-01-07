import { FC, FormEventHandler, MouseEventHandler } from "react";
import { BiLoader } from "react-icons/bi";
import classNames from "classnames";

interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  disabledColor?: string;
  textColor?: string;
  padding?: string;
  borderRadius?: string;
  variant?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ActionButton: FC<Props> = ({
  disabled,
  disabledColor = "disabled:grey-500",
  busy = false,
  title,
  onClick,
  textColor = "text-highlight-dark",
  padding = "px-6 py-2",
  borderRadius = "rounded",
  variant = "primary",
}): JSX.Element => {
  const buttonClasses = classNames(
    textColor,
    padding,
    borderRadius,
    disabledColor,
    "border-none", // Add common button classes here
    "cursor-pointer",
    "focus:outline-none",
    "flex",
    "items-center",
    "space-x-5",
    {
      "bg-nav hover:bg-button-light": variant === "primary",
      "bg-red-600 hover:bg-red-700": variant === "danger",
      disabledColor: variant === "disabled",
    }
  );
  return (
    <button
      id="action-button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{title}</span>
      {busy && <BiLoader className="animate-spin" size={20} />}
    </button>
  );
};

export default ActionButton;
