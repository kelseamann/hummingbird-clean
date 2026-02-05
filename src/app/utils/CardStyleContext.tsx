import React, { createContext, useContext, useState, ReactNode } from 'react';

type CardStyle = 'A' | 'B' | 'C';

interface CardStyleContextType {
  cardStyle: CardStyle;
  setCardStyle: (style: CardStyle) => void;
}

const CardStyleContext = createContext<CardStyleContextType | undefined>(undefined);

export const CardStyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cardStyle, setCardStyle] = useState<CardStyle>('A');

  return (
    <CardStyleContext.Provider value={{ cardStyle, setCardStyle }}>
      {children}
    </CardStyleContext.Provider>
  );
};

export const useCardStyle = (): CardStyleContextType => {
  const context = useContext(CardStyleContext);
  if (!context) {
    throw new Error('useCardStyle must be used within a CardStyleProvider');
  }
  return context;
};
