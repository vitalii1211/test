import {useState, createContext, useContext} from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    // чтобы пользователь был авторизован, нужно чтобы он был в user
    // при логине мы его кладем в setUser, а на todoContainer его уже нет, получается
    // попробуем его получить в todoContainder через useEffect

    const [user, setUser] = useState(null)

    const login = user => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
   return useContext(AuthContext)
}