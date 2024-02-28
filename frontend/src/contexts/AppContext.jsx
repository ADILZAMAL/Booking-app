import React, { useState } from "react";
import PropTypes from "prop-types";
import Toast from "../components/Toast";
import {useQuery} from "react-query";
import * as apiClient from "../api-client";

const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const [toast, setToast] = useState(undefined);
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
            setToast(toastMessage)
        },
        isLoggedIn: !isError
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
