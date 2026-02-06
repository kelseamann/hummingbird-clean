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

// Typography Labels Context
interface TypographyLabelsContextType {
  showTypographyLabels: boolean;
  setShowTypographyLabels: (show: boolean) => void;
}

const TypographyLabelsContext = createContext<TypographyLabelsContextType | undefined>(undefined);

export const TypographyLabelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showTypographyLabels, setShowTypographyLabels] = useState<boolean>(false);

  return (
    <TypographyLabelsContext.Provider value={{ showTypographyLabels, setShowTypographyLabels }}>
      {children}
    </TypographyLabelsContext.Provider>
  );
};

export const useTypographyLabels = (): TypographyLabelsContextType => {
  const context = useContext(TypographyLabelsContext);
  if (!context) {
    throw new Error('useTypographyLabels must be used within a TypographyLabelsProvider');
  }
  return context;
};
