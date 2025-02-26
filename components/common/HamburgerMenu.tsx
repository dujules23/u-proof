import { FC } from "react";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const HamburgerMenu: FC<Props> = ({ isOpen, toggle }): JSX.Element => {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center w-6 h-6"
      onClick={toggle}
      aria-label="Toggle menu"
    >
      <span
        className={`h-0.5 w-6 bg-current transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-current my-1 transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-current transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      />
    </button>
  );
};

export default HamburgerMenu;
