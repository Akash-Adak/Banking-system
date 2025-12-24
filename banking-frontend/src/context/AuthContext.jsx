import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  
 const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/"); // redirect to home page
  };
  // Decode token + validate
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // Check token expiry
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        logout();
        return;
      }

      setUser({
        email: decoded.sub,
        roles: decoded.roles || [],
      });
      setLoading(false);
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
    }
  }, [token]);

  // Login function
  const login = (jwt) => {
    console.log(jwt);
    localStorage.setItem("token", jwt);
    setToken(jwt);
    navigate("/dashboard"); // redirect after login
  };

  // Logout function
 

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
