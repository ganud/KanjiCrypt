import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/header";
import Input from "./components/input";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header></Header>
        <Input></Input>
      </div>
    </>
  );
}

export default App;
