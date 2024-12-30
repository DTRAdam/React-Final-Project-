import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Cards from './components/Cards';
import Register from './components/Register';
import About from './components/About';
import { FavCrdsContext, SiteThemeContext } from './Context/Context';
import Login from './components/Login';
import MyCards from './components/MyCards';
import UpdateCard from './components/UpdateCard';
import Crm from './components/CrmComponent';
import FavoriteCrad from './components/FavoriteCrad';
import { Card } from './interfaces/cards';
import PageNotFound from './components/PageNotFound';


export const themes = {
  light: {
    color: "black",
    background: "#f9f6ee",
  },
  dark: {
    color: "white",
    background: "linear-gradient(90deg, #011139, #101720, #070c10)",
  },
};
function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [favorites, setFavorites] = useState<Card[]>([]);
  return (

    <SiteThemeContext.Provider value={{ darkMode, setDarkMode, }}>
      <FavCrdsContext.Provider value={{ favorites, setFavorites }}>
        <div className="App"  >
          <Router>
            <NavBar />
            <Routes>
              <Route path={"/"} element={<Cards />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/about"} element={<About />} />
              <Route path={"/favoritecrad"} element={<FavoriteCrad />} />
              <Route path={"/mycards"} element={<MyCards />} />
              <Route path={"/updatecard"} element={<UpdateCard />} />
              <Route path={"/crm"} element={<Crm />} />
              <Route path={"/pagenotfound"} element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </FavCrdsContext.Provider>
    </SiteThemeContext.Provider>

  );
}
export default App;
