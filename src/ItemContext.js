// ItemContext.js
import { createContext, useContext, useState } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [item, setItem] = useState(null);

  return (
    <ItemContext.Provider value={{ item, setItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => useContext(ItemContext);
