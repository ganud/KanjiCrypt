import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/header";
import Input from "./components/input";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  // Toggle dark mode
  function toggleDark() {
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
