import { createContext } from 'react';

export type Settings = {
    showTags: boolean
}

export type SettingsContextType = {
    settings: Settings,
    setSettings: (s: Settings) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: {
        showTags: false
    },
    setSettings: (s: Settings) => {console.log(s)}
});