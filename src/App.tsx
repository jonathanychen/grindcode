import React, { useState } from "react";
import "./App.css";

import { LuDumbbell } from "react-icons/lu";
import DailyQuestion from "./components/DailyQuestion";
import { Settings, SettingsContext } from "./contexts/SettingsContext";

function App() {
  const [settings, setSettings] = useState<Settings>({ showTags: false });

  return (
    <div className="App">
      <SettingsContext.Provider value={{settings, setSettings}}>
      <div className="flex flex-col align-center p-4 w-full">
        <div className="flex flex-row self-center items-center my-1">
          <LuDumbbell size={24} className="mr-1" />
          <h1 className="text-xl">Grindcode</h1>
        </div>
        <p>A Chrome extension for all of your LeetCode grind needs.</p>
        <DailyQuestion />
      </div>
    </SettingsContext.Provider>
    </div>
  );
}

export default App;
