import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if authentication token exists in sessionStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, set isLoggedIn to true
    }
  }, []); // Only run this effect once, when the component mounts

  const updateAuthStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const updateUser = (newUserData) => {
//     setUser(newUserData);
//   };

//   return (
//     <AuthContext.Provider value={{ user, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };