import React, { useState, useEffect } from "react";

function ChangeTheme({ isNavbar }) {
  const [theme, setTheme] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    const checkbox = document.querySelector(
      isNavbar ? ".theme-checkbox-navbar" : ".theme-checkbox"
    );

    if (theme === "dark") {
      htmlElement.classList.add("dark");
      checkbox.checked = true;
    } else {
      htmlElement.classList.remove("dark");
      checkbox.checked = false;
    }
  }, [theme, isNavbar]);

  return (
    <input
      type="checkbox"
      checked={theme === "dark"}
      onChange={toggleTheme}
      className={`theme-checkbox${isNavbar ? "-navbar" : ""}`}
    />
  );
}

export default ChangeTheme;
