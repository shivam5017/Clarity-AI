"use client"
import { createContext, useContext } from "react";

interface AppType {}


const defaultState={}

const AppContext = createContext<AppType>(defaultState)

export default function AppContextProvider({
    children,
}:{
    children: React.ReactNode
}){
    return <AppContext.Provider value={{}} >{children}</AppContext.Provider>
}


export function useAppContext(){
    return useContext(AppContext)
}