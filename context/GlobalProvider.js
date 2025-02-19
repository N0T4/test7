import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();



export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            setIsLoading(true);
            try {

                const savedUser = await AsyncStorage.getItem("user");

                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                    setIsLoggedIn(true);
                } else {
                    const fetchedUser = await getCurrentUser();
    
                    if (fetchedUser) {
                        setUser(fetchedUser);
                        setIsLoggedIn(true);
                        await AsyncStorage.setItem("user", JSON.stringify(fetchedUser));
                    } else {
                        setIsLoggedIn(false);
                    }
                }
            } catch (error) {
                console.error("🔴 Помилка завантаження користувача:", error);
            }
            setIsLoading(false);
        };
    
        loadUser();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
