import React, { useState } from "react";
import PropTypes from "prop-types";
import Toast from "../components/Toast";
const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const [toast, setToast] = useState(undefined);
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
            setToast(toastMessage)
        },
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.element,
};

export const useAppContext = () => {
  return React.useContext(AppContext);
};
