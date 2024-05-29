import { FC, FormEventHandler, MouseEventHandler } from "react";
import { BiLoader } from "react-icons/bi";

interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ActionButton: FC<Props> = ({
  disabled,
  busy = false,
  title,
  onClick,
}): JSX.Element => {
  return (
    <button
      className="text-highlight-dark bg-nav disabled:bg-gray-600 hover:bg-green-900 px-6 py-2 font-semibold duration-100 rounded w-full flex items-center justify-center space-x-2 transition w-50"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{title}</span>
      {busy && <BiLoader className="animate-spin" size={20} />}
    </button>
  );
};

export default ActionButton;
