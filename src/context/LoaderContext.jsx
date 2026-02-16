import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = React.forwardRef(({ children }, ref) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = () => setLoadingCount(c => c + 1);
  const hideLoader = () => setLoadingCount(c => Math.max(c - 1, 0));

  if (ref) ref.current = { showLoader, hideLoader };

  return (
    <LoaderContext.Provider value={{ loadingCount }}>
      {children}
    </LoaderContext.Provider>
  );
});

export const useLoader = () => useContext(LoaderContext);
