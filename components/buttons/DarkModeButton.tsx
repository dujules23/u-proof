"use client";

import { LuSun as SunIcon } from "react-icons/lu";
import { IoMoonOutline as MoonIcon } from "react-icons/io5";
import { FC, useState } from "react";
import useDarkMode from "@/hooks/useDarkMode";

interface Props {}

const DarkModeButton: FC<Props> = (props): JSX.Element => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { toggleTheme } = useDarkMode();

  // function that switches the button based on the mode the user wants
  const switchButton = () => {
    const THEME_MODE = "theme-mode";
    const checkMode = localStorage.getItem(THEME_MODE);
    if (checkMode === "light") {
      toggleTheme();
      setIsDark(false);
    } else {
      toggleTheme();
      setIsDark(true);
    }
  };

  return (
    <>
      {isDark ? (
        <button id="dark-mode-button" onClick={switchButton}>
          <MoonIcon className="h-6 w-6 hover:text-yellow-400 transition ease-in-out" />
        </button>
      ) : (
        <button id="dark-mode-button" onClick={switchButton}>
          <SunIcon className="h-6 w-6 hover:text-yellow-400 transition ease-in-out" />
        </button>
      )}
    </>
  );
};

export default DarkModeButton;
