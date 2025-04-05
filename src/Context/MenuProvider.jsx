import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = (menuType) => {
    if (activeMenu === menuType) {
      setIsMenuVisible(false);
      setActiveMenu(null);
    } else {
      setActiveMenu(menuType);
      setIsMenuVisible(true);
    }
  };

  return (
    <MenuContext.Provider value={{ activeMenu, isMenuVisible, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);