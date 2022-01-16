import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { loginWithCookies, logoutAPI } from "../helpers/APICalls/auth";

export const AuthContext = createContext({
  loggedInUser: undefined,
  userProfile: undefined,
  updateLoginContext: () => null,
  updateProfileContext: () => null,
  logout: () => null,
  // for notifications error
  setLoggedInUser: () => null,
});

export const AuthProvider = ({ children }) => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState();
  const history = useHistory();
  const updateLoginContext = useCallback((data) => {
    setLoggedInUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie

    await logoutAPI()
      .then(() => {
        setLoggedInUser(null);
        console.log("LOGOUT");
        history.push("/login");
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data) => {
        if (data.success) {
          updateLoginContext(data.success, false);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        updateLoginContext,
        logout,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
