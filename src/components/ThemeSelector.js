import React from "react";
import { useTheme } from "../Theme/ThemeProvider";

const ThemeSelector = () => {
  const { theme } = useTheme();

  return (
    <h1 className="text-2xl font-luckiestGuy text-slate-100">
      {theme}
    </h1>
  );
};

export default ThemeSelector;
