import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const res = await fetch("./Products/Users.json");
      const data = await res.json();

      const existingUser = data.find(
        (item) => item.email === email && item.pass === password
      );

      if (existingUser) {
        setUser(existingUser);
        localStorage.setItem("user",JSON.stringify([existingUser]));
        setError(null);
      } else {
        setUser(null);
        setError("Invalid email or password");
        
      }
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
      
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user,setUser, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
