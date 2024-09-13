// GlobalContext.js
import React, { createContext, useState, useContext } from 'react';

// Context 생성
const GlobalContext = createContext();

// Context 제공 컴포넌트
export function GlobalProvider({ children }) {
  const [data, setData] = useState(null);

  // 데이터 업데이트 함수
  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <GlobalContext.Provider value={{ data, updateData }}>
      {children}
    </GlobalContext.Provider>
  );
}

// useGlobal 훅
export function useGlobal() {
  return useContext(GlobalContext);
}
