import React from "react";
import "./App.css";

import { LuDumbbell } from "react-icons/lu";
import DailyQuestion from "./components/DailyQuestion";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col align-center p-4 w-full">
        <div className="flex flex-row self-center items-center my-1">
          <LuDumbbell size={24} className="mr-1" />
          <h1 className="text-xl">Grindcode</h1>
        </div>
        <p>A Chrome extension for all of your LeetCode grind needs.</p>
        <DailyQuestion />
      </div>
    </div>
  );
}

export default App;
