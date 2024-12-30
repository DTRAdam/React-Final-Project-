import { createContext, Dispatch, SetStateAction, useState } from "react"
import { Card } from "../interfaces/cards"

type DarkModeContextValue = {
    darkMode: {},
    setDarkMode: Dispatch<SetStateAction<boolean>>
}

export const SiteThemeContext = createContext<DarkModeContextValue>({
    darkMode: false,
    setDarkMode: () => { },
})




type FavCrdsContextValue = {
    favorites: Card[],
    setFavorites: Dispatch<SetStateAction<Card[]>>
};

export const FavCrdsContext = createContext<FavCrdsContextValue>({
    favorites: [],
    setFavorites: () => { },
});

