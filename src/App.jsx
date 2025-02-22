import { useState } from "react";
import Header from "./components/header";
import Input from "./components/input";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    // Localstorage only stores string. Empty means light mode.
    return localStorage.getItem("isDark") || "";
  });
  // Toggle dark mode
  function toggleDark() {
    if (isDark) {
      localStorage.setItem("isDark", "");
    } else {
      localStorage.setItem("isDark", "q");
    }
    setIsDark(!isDark);
  }
  return (
    <>
      <div
        className="flex flex-col h-screen"
        data-theme={isDark ? "dark" : "light"}
      >
        <Header toggleDark={toggleDark}></Header>
        <Input></Input>
      </div>
    </>
  );
}

export default App;
